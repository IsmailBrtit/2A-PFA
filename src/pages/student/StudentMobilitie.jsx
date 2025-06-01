import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';
import Layout from '../../components/common/Layout';

const StudentMobilities = ({ user }) => {
  const [mobilities, setMobilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMobilities = async () => {
      try {
        setLoading(true);
        const data = await studentService.getStudentMobilities();
        setMobilities(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des mobilités.');
      } finally {
        setLoading(false);
      }
    };
    loadMobilities();
  }, []);

  if (loading) return <Layout user={user}><p>Chargement de mobilité...</p></Layout>;
  if (error) return <Layout user={user}><p className="text-red-600">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Ma Mobilité</h1>
        {mobilities.length === 0 ? (
          <p>Aucune mobilité trouvée.</p>
        ) : (
          mobilities.map(mobility => (
            <div key={mobility.id} className="bg-white shadow rounded p-4 mb-4 border border-gray-200">
              <h2 className="text-xl font-semibold">{mobility.program}</h2>
              <p><strong>Durée :</strong> {mobility.startDate} - {mobility.endDate}</p>
              <p><strong>Type :</strong> {mobility.type}</p>
              <p><strong>Statut :</strong> {mobility.status}</p>
              <p><strong>Décision :</strong> {mobility.decision?.verdict || 'Pas encore prise'}</p>
              {mobility.decision?.comment && (
                <p><strong>Commentaire :</strong> {mobility.decision.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default StudentMobilities;
