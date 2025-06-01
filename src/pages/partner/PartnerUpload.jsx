import React, { useState, useEffect } from 'react';
import Layout from '../../components/common/Layout';
import { partnerService } from '../../services/partnerService';

const PartnerUpload = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [docType, setDocType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await partnerService.getPartnerStudents();
        setStudents(data);
      } catch {
        setMessage("Erreur lors du chargement des étudiants.");
      }
    };
    fetchStudents();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedFile || !docType) {
      setMessage("Veuillez sélectionner un étudiant, un type de document et un fichier.");
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      // Mock upload via partnerService (à remplacer par vrai upload API)
      const res = await partnerService.uploadDocument(selectedStudentId, selectedFile, docType);
      if (res.success) {
        setMessage("Document uploadé avec succès !");
        setSelectedFile(null);
        setSelectedStudentId('');
        setDocType('');
      } else {
        setMessage("Erreur lors de l'upload.");
      }
    } catch {
      setMessage("Erreur lors de l'upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout user={user}>
      <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-6">Uploader un document</h1>

        {message && (
          <p className={`mb-4 ${message.includes('Erreur') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="student-select" className="block mb-2 font-medium">Sélectionnez un étudiant :</label>
            <select
              id="student-select"
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Choisir un étudiant --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.fullName}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="docType" className="block mb-2 font-medium">Type de document</label>
            <select
              id="docType"
              value={docType}
              onChange={e => setDocType(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Choisir un type --</option>
              <option value="TRANSCRIPT">Relevé de notes</option>
              <option value="ATTESTATION_REUSSITE">Attestation de réussite</option>
              <option value="OTHER">Autre</option>
            </select>
          </div>

          <div>
            <label htmlFor="file-upload" className="block mb-2 font-medium">Fichier</label>
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {uploading ? "Upload en cours..." : "Uploader"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PartnerUpload;
