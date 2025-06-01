import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';
import Layout from '../../components/common/Layout';

const StudentDocuments = ({ user }) => {
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
      } catch {
        setError("Erreur lors du chargement des documents.");
      } finally {
        setLoading(false);
      }
    };
    loadMobilities();
  }, []);

  if (loading) return <Layout user={user}><p>Chargement des documents...</p></Layout>;
  if (error) return <Layout user={user}><p className="text-red-600">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mes Documents</h1>
        {mobilities.length === 0 ? (
          <p>Aucun document disponible.</p>
        ) : (
          mobilities.map((mobility) => (
            <div key={mobility.id} className="mb-6 bg-white p-4 rounded shadow border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">{mobility.program} ({mobility.startDate} - {mobility.endDate})</h2>
              <ul className="list-disc list-inside">
                {mobility.documents.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {doc.originalFilename}
                    </a> — <span className="italic">{doc.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default StudentDocuments;
