import React, { useState } from 'react';

const ValidationCard = ({ decision, mobility, student }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDecision = async (verdict) => {
    setLoading(true);
    await onUpdate(decision.id, { verdict, comment, decisionDate: new Date().toISOString().slice(0,10), madeBy: 'Coordinateur', madeByRole: 'COORDINATOR' });
    setLoading(false);
  };

  return (
    <div className="border rounded p-4 shadow mb-4 bg-white">
      <h3 className="font-bold mb-2">Décision #{decision.id} - Mobilité #{decision.mobilityId}</h3>
      <p><strong>Étudiant :</strong> {student?.fullName || 'N/A'}</p>
      <p><strong>Filière :</strong> {student?.filiere || 'N/A'}</p>
      <p><strong>Mention :</strong> {decision.mention || 'N/A'}</p>
      <p><strong>Statut :</strong> {decision.verdict}</p>
      {decision.comment && <p><strong>Commentaire :</strong> {decision.comment}</p>}

      {decision.verdict === 'PENDING' && (
        <>
          <textarea
            placeholder="Ajouter un commentaire (optionnel)"
            className="w-full border p-2 mt-2 mb-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={loading}
            onClick={() => handleDecision('APPROVED')}
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
          >
            Valider
          </button>
          <button
            disabled={loading}
            onClick={() => handleDecision('REJECTED')}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Refuser
          </button>
        </>
      )}

      {loading && <p>En cours...</p>}
    </div>
  );
};

export default ValidationCard;
