import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import * as mobilityService from '../../services/mobilityService';
import { Link } from 'react-router-dom';

const filieres = ['GL', 'IDSIT', 'GD', 'SSI', 'BIA', 'SSE', 'SSCL', 'IA', 'IDF'];

const MobilityList = ({ user }) => {
  const [mobilities, setMobilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterStatus, setFilterStatus] = useState('');
  const [filterAcademicYear, setFilterAcademicYear] = useState('');
  const [filterFiliere, setFilterFiliere] = useState('');

  const [availableAcademicYears, setAvailableAcademicYears] = useState([]);

  useEffect(() => {
    async function loadMobilities() {
      try {
        const data = await mobilityService.fetchMobilities();
        setMobilities(data);
        setError(null);

        // Extraire années académiques uniques
        const yearsSet = new Set();
        data.forEach(mob => {
          mob.academicYears?.forEach(y => {
            if (y.yearLabel) yearsSet.add(y.yearLabel);
          });
        });
        setAvailableAcademicYears([...yearsSet].sort());
      } catch {
        setError('Erreur lors du chargement des mobilités');
      } finally {
        setLoading(false);
      }
    }
    loadMobilities();
  }, []);

  // Filtrage avec les 3 critères
  const filteredMobilities = mobilities.filter(mob => {
    if (filterStatus && mob.status !== filterStatus) return false;
    if (filterAcademicYear && !mob.academicYears?.some(y => y.yearLabel === filterAcademicYear)) return false;
    if (filterFiliere && mob.student?.filiere !== filterFiliere) return false;
    return true;
  });

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Liste des mobilités</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4 flex flex-wrap gap-4 items-center">
          <div>
            <label htmlFor="statusFilter" className="mr-2 font-semibold">Filtrer par statut :</label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Tous</option>
              <option value="PENDING">En attente</option>
              <option value="APPROVED">Validé</option>
              <option value="REJECTED">Rejeté</option>
              {/* Ajoute ici les autres statuts si besoin */}
            </select>
          </div>

          <div>
            <label htmlFor="academicYearFilter" className="mr-2 font-semibold">Filtrer par année académique :</label>
            <select
              id="academicYearFilter"
              value={filterAcademicYear}
              onChange={e => setFilterAcademicYear(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Toutes</option>
              {availableAcademicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filiereFilter" className="mr-2 font-semibold">Filtrer par filière :</label>
            <select
              id="filiereFilter"
              value={filterFiliere}
              onChange={e => setFilterFiliere(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Toutes</option>
              {filieres.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : filteredMobilities.length === 0 ? (
          <p>Aucune mobilité trouvée.</p>
        ) : (
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4">Programme</th>
                <th className="py-2 px-4">Début</th>
                <th className="py-2 px-4">Fin</th>
                <th className="py-2 px-4">Statut</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMobilities.map(mob => (
                <tr key={mob.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{mob.program}</td>
                  <td className="py-2 px-4">{mob.startDate}</td>
                  <td className="py-2 px-4">{mob.endDate}</td>
                  <td className="py-2 px-4">{mob.status}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/mobility/${mob.id}/documents`}
                      className="text-blue-600 hover:underline"
                    >
                      Documents
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default MobilityList;
