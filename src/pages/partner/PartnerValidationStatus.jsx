// src/pages/partner/PartnerValidationStatus.jsx
import React, { useEffect, useState } from 'react';
import { partnerService } from '../../services/partnerService';
import Layout from '../../components/common/Layout';

const PartnerValidationStatus = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValidationStatus = async () => {
      setLoading(true);
      const data = await partnerService.getPartnerStudents();
      setStudents(data);
      setLoading(false);
    };
    fetchValidationStatus();
  }, []);

  return (
    <Layout user={user}>
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Statut de validation des dossiers</h1>
        {loading ? (
          <p>Chargement...</p>
        ) : students.length === 0 ? (
          <p>Aucun dossier à afficher.</p>
        ) : (
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr>
                <th className="border px-3 py-2">Étudiant</th>
                <th className="border px-3 py-2">Filière</th>
                <th className="border px-3 py-2">Statut Mobilité</th>
                <th className="border px-3 py-2">Documents</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td className="border px-3 py-2">{student.fullName}</td>
                  <td className="border px-3 py-2">{student.filiere}</td>
                  <td className="border px-3 py-2">{student.mobilityStatus}</td>
                  <td className="border px-3 py-2">
                    {student.documents.length} document{student.documents.length > 1 ? 's' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default PartnerValidationStatus;
