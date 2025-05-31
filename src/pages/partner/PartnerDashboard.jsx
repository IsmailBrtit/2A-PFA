import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import { partnerService } from '../../services/partnerService';

const PartnerDashboard = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    partnerService.getPartnerStudents()
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des étudiants");
        setLoading(false);
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedStudentId) {
      alert("Veuillez sélectionner un étudiant et un fichier.");
      return;
    }

    setUploading(true);
    partnerService.uploadDocument(selectedStudentId, selectedFile)
      .then(res => {
        if (res.success) {
          setUploadSuccess(true);
          setSelectedFile(null);
          setSelectedStudentId(null);
          // Optionnel : rafraîchir la liste des étudiants/documents ici
        } else {
          alert("Erreur lors de l'upload");
        }
        setUploading(false);
      })
      .catch(() => {
        alert("Erreur lors de l'upload");
        setUploading(false);
      });
  };

  if (loading) return <Layout user={user}><p className="p-6">Chargement...</p></Layout>;
  if (error) return <Layout user={user}><p className="p-6 text-red-500">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard Partenaire</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Liste des étudiants associés</h2>
          <p className="text-gray-600 mb-4 max-w-5xl">
            Retrouvez ici la liste des étudiants rattachés à votre université ainsi que
             leurs documents et statut de mobilité.
          </p>

          <table className="min-w-full bg-white shadow rounded mb-6">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4">Nom complet</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Filière</th>
                <th className="py-2 px-4">Statut mobilité</th>
                <th className="py-2 px-4">Documents</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b hover:bg-gray-50 align-top">
                  <td className="py-2 px-4">{student.fullName}</td>
                  <td className="py-2 px-4">{student.email}</td>
                  <td className="py-2 px-4">{student.filiere}</td>
                  <td className="py-2 px-4">{student.mobilityStatus}</td>
                  <td className="py-2 px-4">
                    {student.documents.length > 0 ? student.documents.map(doc => (
                      <div key={doc.id} className="mb-1 p-1 border rounded bg-gray-50">
                        <strong>{doc.type}</strong>: {doc.originalFilename} <br />
                        <small>Upload: {doc.uploadDate}</small>
                      </div>
                    )) : <span>-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Uploader un document</h2>

          <div className="mb-4">
            <label htmlFor="student-select" className="block mb-2 font-medium">Sélectionnez un étudiant :</label>
            <select
              id="student-select"
              className="border p-2 rounded w-full max-w-sm"
              value={selectedStudentId || ''}
              onChange={e => setSelectedStudentId(Number(e.target.value))}
            >
              <option value="" disabled>Sélectionnez un étudiant</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.fullName}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="file-upload" className="block mb-2 font-medium">Choisir un fichier :</label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="border p-2 rounded w-full max-w-sm"
              accept=".pdf,.doc,.docx"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 transition duration-300"
          >
            {uploading ? "Upload en cours..." : "Uploader"}
          </button>

          {uploadSuccess && (
            <p className="mt-4 text-green-600 font-semibold">Document uploadé avec succès !</p>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default PartnerDashboard;
