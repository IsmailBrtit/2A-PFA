import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import studentService from '../../services/studentService';

const StudentDashboard = ({ user }) => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [mobilities, setMobilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await studentService.getStudentInfo();
        const mobs = await studentService.getStudentMobilities();
        setStudentInfo(info);
        setMobilities(mobs);
        setLoading(false);
      } catch {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Layout user={user}><p className="p-6">Chargement...</p></Layout>;
  if (error) return <Layout user={user}><p className="p-6 text-red-500">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Bienvenue {studentInfo.fullName}</h1>

        <section className="mb-8 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-5 border-b pb-2">Informations personnelles</h2>
            <p className="mb-2"><strong>Email :</strong> {studentInfo.email}</p>
            <p className="mb-2"><strong>Filière :</strong> {studentInfo.filiere}</p>
            <p><strong>Partenaire :</strong> {studentInfo.partner ? `${studentInfo.partner.universityName} (${studentInfo.partner.country})` : '-'}</p>
        </section>

        <section>
  <h2 className="text-2xl font-semibold mb-5 border-b pb-2">Mes mobilités</h2>
  {mobilities.length === 0 ? (
    <p className="text-gray-500 italic">Aucune mobilité trouvée.</p>
  ) : (
    mobilities.map(mobility => (
      <div key={mobility.id} className="mb-8 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-bold mb-3">{mobility.program}</h3>
        <p className="mb-1"><strong>Dates :</strong> {mobility.startDate} - {mobility.endDate}</p>
        <p className="mb-1"><strong>Type :</strong> <span className="uppercase">{mobility.type}</span></p>
        <p className="mb-3"><strong>Statut :</strong> <span className="text-indigo-600 font-semibold">{mobility.status}</span></p>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 border-b pb-1">Décision</h4>
          {mobility.decision ? (
            <div className="border rounded p-4 bg-gray-50">
              <p className="mb-1"><strong>Date :</strong> {mobility.decision.decisionDate}</p>
              <p className="mb-1"><strong>Verdict :</strong> <span className="font-semibold">{mobility.decision.verdict}</span></p>
              <p className="mb-1"><strong>Mention :</strong> {mobility.decision.mention}</p>
              <p className="mb-1"><strong>Validateur :</strong> {mobility.decision.madeBy} <em>({mobility.decision.madeByRole})</em></p>
              <p className="mb-2"><strong>Commentaire :</strong> {mobility.decision.comment || '-'}</p>
              <div className="flex gap-4">
                <a href={mobility.decision.pvPath} className="text-blue-600 underline" target="_blank" rel="noreferrer">Procès-Verbal</a>
                <a href={mobility.decision.attestationPath} className="text-blue-600 underline" target="_blank" rel="noreferrer">Attestation</a>
              </div>
            </div>
          ) : (
            <p className="italic text-gray-500">Aucune décision enregistrée.</p>
          )}
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 border-b pb-1">Documents</h4>
          {mobility.documents.length === 0 ? (
            <p className="italic text-gray-500">Aucun document.</p>
          ) : (
            mobility.documents.map(doc => (
              <div key={doc.id} className="border rounded p-3 bg-gray-50 mb-3">
                <p><strong>Type :</strong> {doc.type}</p>
                <p><strong>Nom :</strong> {doc.originalFilename}</p>
                <p><strong>Date d'upload :</strong> {doc.uploadDate}</p>
                <a href={doc.filePath} className="text-blue-600 underline" target="_blank" rel="noreferrer">Télécharger</a>
                <p><strong>OCR extrait :</strong> {doc.ocrExtracted ? 'Oui' : 'Non'}</p>
              </div>
            ))
          )}
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2 border-b pb-1">Années Académiques & Modules</h4>
          {mobility.academicYears.map(year => (
            <div key={year.id} className="mb-4">
              <p className="font-semibold text-indigo-700">{year.yearLabel}</p>
              {year.semesters.map(sem => (
                <div key={sem.id} className="ml-4 mb-3">
                  <p className="underline font-medium">{sem.label} ({sem.type})</p>
                  <ul className="list-disc list-inside">
                    {sem.modules.map(mod => (
                      <li key={mod.id}>
                        {mod.name} - Note originale: <span className="font-semibold">{mod.originalGrade}</span> / Note convertie: <span className="font-semibold">{mod.convertedGrade}</span> / ECTS: {mod.ects} {mod.isPfe && <span className="italic text-gray-600">(PFE)</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ))
  )}
</section>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
