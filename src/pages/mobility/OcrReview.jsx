import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import * as documentService from '../../services/documentService';
import { useParams } from 'react-router-dom';

const OcrReview = ({ user }) => {
  const { mobilityId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedTexts, setEditedTexts] = useState({}); // { docId: editedText }

  useEffect(() => {
    async function loadDocuments() {
      try {
        const docs = await documentService.fetchDocumentsByMobilityId(mobilityId);
        setDocuments(docs);
        setError(null);
      } catch {
        setError('Erreur lors du chargement des documents');
      } finally {
        setLoading(false);
      }
    }
    loadDocuments();
  }, [mobilityId]);

  const handleTextChange = (docId, text) => {
    setEditedTexts(prev => ({ ...prev, [docId]: text }));
  };

  const handleSave = async (docId) => {
    try {
      const newText = editedTexts[docId];
      await documentService.updateDocument(docId, { rawOcrText: newText });
      alert('Texte OCR sauvegardé');
    } catch {
      alert('Erreur lors de la sauvegarde');
    }
  };

  if (loading) return <Layout user={user}><p className="p-6">Chargement...</p></Layout>;
  if (error) return <Layout user={user}><p className="p-6 text-red-500">{error}</p></Layout>;

  if (documents.length === 0) return (
    <Layout user={user}>
      <p className="p-6">Aucun document OCR à valider pour cette mobilité.</p>
    </Layout>
  );

  return (
    <Layout user={user}>
      <div className="p-6 max-w-5xl mx-auto bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Validation OCR des documents</h1>

        {documents.map(doc => (
          <div key={doc.id} className="bg-white rounded shadow p-4 mb-6">
            <h2 className="font-semibold mb-2">{doc.originalFilename}</h2>
            <textarea
              className="w-full border p-2 rounded resize-y min-h-[150px]"
              value={editedTexts[doc.id] ?? doc.rawOcrText ?? ''}
              onChange={e => handleTextChange(doc.id, e.target.value)}
            />
            <button
              onClick={() => handleSave(doc.id)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sauvegarder OCR
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default OcrReview;
