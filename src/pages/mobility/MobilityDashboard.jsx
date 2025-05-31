import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import * as mobilityService from '../../services/mobilityService';
import * as documentService from '../../services/documentService';
import * as decisionService from '../../services/decisionService';

function Card({ title, count }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center justify-center">
      <h3 className="text-gray-500 uppercase text-sm">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}

const MobilityDashboard = ({ user }) => {
  const [mobilities, setMobilities] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      })
      .catch(() => {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      });
  }, []);

  const countByStatus = (status) => mobilities.filter(m => m.status === status).length;

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard Mobility Officer</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card title="Total Mobilités" count={mobilities.length} />
              <Card title="Mobilités Validées" count={countByStatus('APPROVED')} />
              <Card title="Mobilités En Attente" count={countByStatus('PENDING')} />
            </div>

            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Liste des mobilités</h2>
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
                  {mobilities.map(mob => (
                    <tr key={mob.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{mob.program}</td>
                      <td className="py-2 px-4">{mob.startDate}</td>
                      <td className="py-2 px-4">{mob.endDate}</td>
                      <td className="py-2 px-4">{mob.status}</td>
                      <td className="py-2 px-4">
                        <button className="text-blue-600 hover:underline mr-2">Voir</button>
                        <button className="text-green-600 hover:underline mr-2">Modifier</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section>
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default MobilityDashboard;
