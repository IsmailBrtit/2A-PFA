// src/pages/coordinator/Validate.jsx
import React, { useEffect, useState } from 'react';
import ValidationCard from '../../components/ValidationCard';
import * as decisionService from '../../services/decisionService';
import Layout from '../../components/common/Layout';


const Validate = ({ user }) => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtrer seulement les décisions en attente (PENDING)
  const pendingDecisions = decisions.filter(d => d.verdict === 'PENDING');

  useEffect(() => {
    const loadDecisions = async () => {
      setLoading(true);
      const data = await decisionService.fetchDecisions();
      setDecisions(data);
      setLoading(false);
    };
    loadDecisions();
  }, []);

  const handleUpdateDecision = async (id, updatedData) => {
    await decisionService.updateDecision(id, updatedData);
    // Recharger la liste
    const data = await decisionService.fetchDecisions();
    setDecisions(data);
  };

  if (loading) return <p>Chargement des décisions...</p>;

  return (
    <Layout user={user}>
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Validation des mobilités</h1>
      {pendingDecisions.length === 0 ? (
        <p>Aucune décision en attente.</p>
      ) : (
        pendingDecisions.map(decision => (
          <ValidationCard key={decision.id} decision={decision} mobility={decision.mobility} student={decision.mobility?.student} />
        ))
      )}
    </div>
    </Layout>
  );
};

export default Validate;
