import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';
import Layout from '../../components/common/Layout';

const StudentStatus = ({ user }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true);
        const data = await studentService.getStudentInfo();
        setStudent(data);
        setError(null);
      } catch {
        setError("Erreur lors du chargement du statut.");
      } finally {
        setLoading(false);
      }
    };
    loadStudent();
  }, []);

  if (loading) return <Layout user={user}><p>Chargement du statut...</p></Layout>;
  if (error) return <Layout user={user}><p className="text-red-600">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Statut du dossier</h1>
        <p><strong>Nom :</strong> {student?.fullName}</p>
        <p><strong>Email :</strong> {student?.email}</p>
        <p><strong>Filière :</strong> {student?.filiere}</p>
        {/* Ajouter d’autres infos pertinentes ici */}
      </div>
    </Layout>
  );
};

export default StudentStatus;
