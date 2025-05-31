import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import * as mobilityService from '../../services/mobilityService';
import * as documentService from '../../services/documentService';
import * as decisionService from '../../services/decisionService';

// Traduction statuts backend -> labels utilisateurs
const statusOptions = [
  { value: '', label: 'Tous les statuts' },
  { value: 'PREPARATION', label: 'Préparation' },
  { value: 'PENDING_DOCS', label: 'En attente de documents' },
  { value: 'VERIFIED', label: 'Vérifié' },
  { value: 'COMMISSION', label: 'En commission' },
  { value: 'VALIDATED', label: 'Validé' },
  { value: 'REJECTED', label: 'Rejeté' },
];

// Enum filières
const filieres = ['', 'GL', 'IDSIT', 'GD', 'SSI', 'BIA', 'SSE', 'SSCL', 'IA', 'IDF'];

const MobilityDashboard = ({ user }) => {
  const [mobilities, setMobilities] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtres
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFiliere, setFilterFiliere] = useState('');
  const [filterAcademicYear, setFilterAcademicYear] = useState('');
  const [filterProgram, setFilterProgram] = useState('');

  // Options années académiques extraites dynamiquement
  const [academicYearsOptions, setAcademicYearsOptions] = useState([]);

  useEffect(() => {
    Promise.all([
      mobilityService.fetchMobilities(),
      documentService.fetchDocuments(),
      decisionService.fetchDecisions(),
    ])
      .then(([mobData, docData, decData]) => {
        setMobilities(mobData);
        setDocuments(docData);
        setDecisions(decData);
        setLoading(false);

        // Extraire années académiques distinctes
        const yearsSet = new Set();
        mobData.forEach(mob => {
          mob.academicYears?.forEach(year => {
            if (year.yearLabel) yearsSet.add(year.yearLabel);
          });
        });
        setAcademicYearsOptions([...yearsSet].sort());
      })
      .catch(() => {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      });
  }, []);

  // Appliquer les filtres
  const filteredMobilities = mobilities.filter(mob => {
    if (filterStatus && mob.status !== filterStatus) return false;
    if (filterFiliere && mob.student?.filiere !== filterFiliere) return false;
    if (filterAcademicYear && !mob.academicYears?.some(y => y.yearLabel === filterAcademicYear)) return false;
    if (filterProgram && !mob.program.toLowerCase().includes(filterProgram.toLowerCase())) return false;
    return true;
  });

  // Fonction pour compter par statut (utilisé dans les cartes)
  const countByStatus = (status) => mobilities.filter(m => m.status === status).length;

  if (loading) return <Layout user={user}><p className="p-6">Chargement...</p></Layout>;
  if (error) return <Layout user={user}><p className="p-6 text-red-500">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard Mobility Officer</h1>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card title="Total Mobilités" count={mobilities.length} />
          <Card title="Mobilités Validées" count={countByStatus('VALIDATED')} />
          <Card title="Mobilités En Attente" count={countByStatus('PENDING_DOCS')} />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-6">
                <h2 className="text-xl font-semibold mb-4 w-full">Liste des mobilities <br /> </h2>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border p-2 rounded"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={filterFiliere}
            onChange={e => setFilterFiliere(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Toutes les filières</option>
            {filieres.filter(f => f !== '').map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <select
            value={filterAcademicYear}
            onChange={e => setFilterAcademicYear(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Toutes les années académiques</option>
            {academicYearsOptions.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filtrer par programme"
            value={filterProgram}
            onChange={e => setFilterProgram(e.target.value)}
            className="border p-2 rounded flex-grow min-w-[200px]"
          />
        </div>

        {/* Liste filtrée */}
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Programme</th>
              <th className="py-2 px-4">Début</th>
              <th className="py-2 px-4">Fin</th>
              <th className="py-2 px-4">Statut</th>
              <th className="py-2 px-4">Filière</th>
              <th className="py-2 px-4">Année académique</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMobilities.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Aucune mobilité trouvée.
                </td>
              </tr>
            ) : (
              filteredMobilities.map(mob => (
                <tr key={mob.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{mob.program}</td>
                  <td className="py-2 px-4">{mob.startDate}</td>
                  <td className="py-2 px-4">{mob.endDate}</td>
                  <td className="py-2 px-4">{statusOptions.find(s => s.value === mob.status)?.label || mob.status}</td>
                  <td className="py-2 px-4">{mob.student?.filiere || '-'}</td>
                  <td className="py-2 px-4">{mob.academicYears?.map(y => y.yearLabel).join(', ') || '-'}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-600 hover:underline mr-2">Voir</button>
                    <button className="text-green-600 hover:underline">Modifier</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Documents récents</h2>
          <ul className="bg-white shadow rounded p-4 max-h-48 overflow-auto">
            {documents.slice(0, 5).map(doc => (
              <li key={doc.id} className="border-b py-2 flex justify-between">
                <span>{doc.originalFilename || 'Document'}</span>
                <span className="text-gray-500">{new Date(doc.uploadDate).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

function Card({ title, count }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center justify-center">
      <h3 className="text-gray-500 uppercase text-sm">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}

export default MobilityDashboard;
