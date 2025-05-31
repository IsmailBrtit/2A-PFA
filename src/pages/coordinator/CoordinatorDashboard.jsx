import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import coordinatorService from '../../services/coordinatorService';

// Mapping backend enum → label utilisateur
const mobilityStatusLabels = {
  PREPARATION: "Préparation",
  PENDING_DOCS: "En attente de documents",
  VERIFIED: "Vérifié",
  COMMISSION: "En commission",
  VALIDATED: "Validé",
  REJECTED: "Rejeté"
};

const filieres = [
  'Toutes',
  'GL',
  'IDSIT',
  'GD',
  'SSI',
  'BIA',
  'SSE',
  'SSCL',
  'IA',
  'IDF'
];
const statuses = ['Tous', ...Object.keys(mobilityStatusLabels)];

const CoordinatorDashboard = ({ user }) => {
  const [mobilities, setMobilities] = useState([]);
  const [filteredMobilities, setFilteredMobilities] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filtres
  const [filterFiliere, setFilterFiliere] = useState('Toutes');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [filterProgram, setFilterProgram] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const mobilitiesData = await coordinatorService.getPendingMobilities();
        const decisionsData = await coordinatorService.getDecisionsHistory();
        setMobilities(mobilitiesData);
        setDecisions(decisionsData);
        setLoading(false);
      } catch {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // applique les filtres
  useEffect(() => {
    let filtered = mobilities;

    if (filterFiliere !== 'Toutes') {
      filtered = filtered.filter(m => m.student?.filiere === filterFiliere);
    }
    if (filterStatus !== 'Tous') {
      filtered = filtered.filter(m => m.status === filterStatus);
    }
    if (filterProgram.trim() !== '') {
      filtered = filtered.filter(m =>
        m.program.toLowerCase().includes(filterProgram.toLowerCase())
      );
    }

    setFilteredMobilities(filtered);
  }, [mobilities, filterFiliere, filterStatus, filterProgram]);

  if (loading) return <Layout user={user}><p className="p-6">Chargement...</p></Layout>;
  if (error) return <Layout user={user}><p className="p-6 text-red-500">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard Coordinateur</h1>

        {/* Filtres */}
        <div className="mb-4 flex flex-wrap gap-4">
          <select
            className="border rounded p-2"
            value={filterFiliere}
            onChange={e => setFilterFiliere(e.target.value)}
          >
            {filieres.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <select
            className="border rounded p-2"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s === 'Tous' ? 'Tous' : mobilityStatusLabels[s]}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Rechercher par programme"
            className="border rounded p-2 flex-grow"
            value={filterProgram}
            onChange={e => setFilterProgram(e.target.value)}
          />
        </div>

        {/* Tableau des mobilités filtrées */}
        <table className="min-w-full bg-white shadow rounded mb-6">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Étudiant</th>
              <th className="py-2 px-4">Filière</th>
              <th className="py-2 px-4">Programme</th>
              <th className="py-2 px-4">Dates</th>
              <th className="py-2 px-4">Statut</th>
              <th className="py-2 px-4 max-w-xs">Commentaires</th>
              <th className="py-2 px-4 max-w-xs">Détails Bulletins</th>
            </tr>
          </thead>
          <tbody>
            {filteredMobilities.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">Aucune mobilité trouvée.</td>
              </tr>
            ) : (
              filteredMobilities.map(m => (
                <tr key={m.id} className="border-b hover:bg-gray-50 align-top">
                  <td className="py-2 px-4">{m.student?.fullName || 'N/A'}</td>
                  <td className="py-2 px-4">{m.student?.filiere || 'N/A'}</td>
                  <td className="py-2 px-4">{m.program}</td>
                  <td className="py-2 px-4">{m.startDate} - {m.endDate}</td>
                  <td className="py-2 px-4">{mobilityStatusLabels[m.status] || m.status}</td>
                  <td className="py-2 px-4 max-w-xs whitespace-normal">{m.comments || '-'}</td>
                  <td className="py-2 px-4 max-w-xs whitespace-normal">
                    {m.documents?.length > 0 ? m.documents.map(doc => (
                      <div key={doc.id} className="mb-2 p-2 border rounded bg-gray-50">
                        <strong>{doc.type}</strong>: {doc.originalFilename} <br />
                        <em>OCR : {doc.ocrExtracted ? "Oui" : "Non"}</em><br/>
                        <small>{doc.uploadDate}</small>
                      </div>
                    )) : <span>-</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Section Historique décisions */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Historique des décisions</h2>
          {decisions.length === 0 ? (
            <p className="text-gray-500">Aucune décision enregistrée.</p>
          ) : (
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-2 px-4">Mobilité</th>
                  <th className="py-2 px-4">Date décision</th>
                  <th className="py-2 px-4">Verdict</th>
                  <th className="py-2 px-4">Validateur</th>
                  <th className="py-2 px-4">Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {decisions.map(d => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{d.mobilityProgram}</td>
                    <td className="py-2 px-4">{d.decisionDate}</td>
                    <td className="py-2 px-4">{d.verdict}</td>
                    <td className="py-2 px-4">{d.madeBy}</td>
                    <td className="py-2 px-4">{d.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default CoordinatorDashboard;
