// src/pages/coordinator/ValidationHistory.jsx
import React, { useEffect, useState } from 'react';
import ValidationCard from '../../components/ValidationCard';
import * as decisionService from '../../services/decisionService';
import Layout from '../../components/common/Layout';


const ValidationHistory = ({ user }) => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtrer les décisions validées ou refusées (tout sauf PENDING)
  const validatedDecisions = decisions.filter(d => d.verdict !== 'PENDING');

  useEffect(() => {
    const loadDecisions = async () => {
      setLoading(true);
      const data = await decisionService.fetchDecisions();
      setDecisions(data);
      setLoading(false);
    };
    loadDecisions();
  }, []);

  if (loading) return <p>Chargement de l’historique...</p>;

  return (
    <Layout user={user}>
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historique des validations</h1>
      {validatedDecisions.length === 0 ? (
        <p>Aucune décision validée ou refusée.</p>
      ) : (
        validatedDecisions.map(decision => (
          <ValidationCard key={decision.id} decision={decision} onUpdate={() => {}} />
        ))
      )}
    </div>
    </Layout>
  );
};

export default ValidationHistory;
