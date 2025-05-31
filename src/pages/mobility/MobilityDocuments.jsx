import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import * as documentService from '../../services/documentService';
import { useParams } from 'react-router-dom';

const MobilityDocuments = ({ user }) => {
  const { mobilityId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadDocs() {
      try {
        const allDocs = await documentService.fetchDocuments();
        // Filtrer par mobilité
        const filtered = allDocs.filter(doc => doc.mobilityId === Number(mobilityId));
        setDocuments(filtered);
        setError(null);
      } catch {
        setError('Erreur lors du chargement des documents');
      } finally {
        setLoading(false);
      }
    }
    loadDocs();
  }, [mobilityId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert('Veuillez choisir un fichier à uploader.');
    setUploading(true);
    try {
      // Simuler upload : créer un objet document minimaliste
      const newDoc = {
        type: 'TRANSCRIPT',  // Par exemple, on pourrait étendre pour choisir le type
        filePath: URL.createObjectURL(selectedFile),
        originalFilename: selectedFile.name,
        contentType: selectedFile.type,
        ocrExtracted: false,
        uploadDate: new Date().toISOString().split('T')[0],
        rawOcrText: '',
        fileHash: '',
        mobilityId: Number(mobilityId),
      };
      await documentService.createDocument(newDoc);
      // Rafraîchir la liste
      const allDocs = await documentService.fetchDocuments();
      setDocuments(allDocs.filter(doc => doc.mobilityId === Number(mobilityId)));
      setSelectedFile(null);
    } catch {
      alert('Erreur lors de l\'upload du document');
    }
    setUploading(false);
  };

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Documents mobilité #{mobilityId}</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-6">
          <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {uploading ? 'Uploading...' : 'Uploader'}
          </button>
        </div>

        {loading ? (
          <p>Chargement des documents...</p>
        ) : documents.length === 0 ? (
          <p>Aucun document trouvé.</p>
        ) : (
          <ul className="bg-white shadow rounded p-4 max-h-96 overflow-auto">
            {documents.map(doc => (
              <li key={doc.id} className="border-b py-2 flex justify-between">
                <div>
                  <strong>{doc.originalFilename}</strong> ({doc.type})
                  <br />
                  Uploadé le {doc.uploadDate}
                  <br />
                  OCR extrait : {doc.ocrExtracted ? 'Oui' : 'Non'}
                </div>
                <a
                  href={doc.filePath}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Télécharger
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default MobilityDocuments;
