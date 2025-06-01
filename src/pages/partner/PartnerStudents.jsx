import React, { useEffect, useState } from 'react';
import { partnerService } from '../../services/partnerService';
import Layout from '../../components/common/Layout';

const PartnerStudents = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await partnerService.getPartnerStudents();
        setStudents(data);
        setError(null);
      } catch {
        setError("Erreur lors du chargement des étudiants.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <Layout user={user}><p>Chargement des étudiants...</p></Layout>;
  if (error) return <Layout user={user}><p className="text-red-600">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mes Étudiants</h1>
        {students.length === 0 ? (
          <p>Aucun étudiant assigné.</p>
        ) : (
          <ul>
            {students.map(student => (
              <li key={student.id} className="mb-4 border rounded p-4 shadow-sm bg-white">
                <p><strong>{student.fullName}</strong> — Filière: {student.filiere}</p>
                <p>Statut mobilité: {student.mobilityStatus}</p>
                <p>Documents:</p>
                <ul className="list-disc list-inside ml-4">
                  {student.documents.map(doc => (
                    <li key={doc.id}>
                      <a
                        href={doc.filePath || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {doc.originalFilename}
                      </a> ({doc.type}) - Upload: {doc.uploadDate}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default PartnerStudents;
