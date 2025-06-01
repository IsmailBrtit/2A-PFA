import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import studentService from '../../services/studentService';
//import { capitalize } from '../utils/helpers';
//import { formatDate } from '../utils/formatters';
//import { isValidEmail } from '../utils/validators';

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
      <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
        <h1 className="text-3xl font-extrabold mb-8 text-indigo-800 drop-shadow">
          Bienvenue {studentInfo.fullName}
        </h1>

        <section className="mb-10 bg-white shadow-2xl rounded-2xl p-8 border border-indigo-100">
          <h2 className="text-2xl font-semibold mb-5 border-b pb-2 text-indigo-700 flex items-center gap-2">
            {/* <FaUserCircle className="text-indigo-400" /> */}
            Informations personnelles
          </h2>
          <p className="mb-2"><strong>Email :</strong> <span className="text-gray-700">{studentInfo.email}</span></p>
          <p className="mb-2"><strong>Filière :</strong> <span className="text-gray-700">{studentInfo.filiere}</span></p>
          <p><strong>Partenaire :</strong> <span className="text-gray-700">{studentInfo.partner ? `${studentInfo.partner.universityName} (${studentInfo.partner.country})` : '-'}</span></p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-5 border-b pb-2 text-indigo-700 flex items-center gap-2">
            {/* <FaPlaneDeparture className="text-indigo-400" /> */}
            Ma mobilité
          </h2>
          {mobilities.length === 0 ? (
            <p className="text-gray-500 italic">Aucune mobilité trouvée.</p>
          ) : (
            mobilities.map(mobility => (
              <div
                key={mobility.id}
                className="mb-10 bg-white shadow-xl rounded-2xl p-8 border border-indigo-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-indigo-800">{mobility.program}</h3>
                <p className="mb-1"><strong>Dates :</strong> <span className="text-gray-700">{mobility.startDate} - {mobility.endDate}</span></p>
                <p className="mb-1"><strong>Type :</strong> <span className="uppercase text-indigo-600">{mobility.type}</span></p>
                <p className="mb-3"><strong>Statut :</strong> <span className="text-indigo-600 font-semibold">{mobility.status}</span></p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 border-b pb-1 text-indigo-700">Décision</h4>
                  {mobility.decision ? (
                    <div className="border rounded-xl p-4 bg-indigo-50">
                      <p className="mb-1"><strong>Date :</strong> {mobility.decision.decisionDate}</p>
                      <p className="mb-1"><strong>Verdict :</strong> <span className="font-semibold">{mobility.decision.verdict}</span></p>
                      <p className="mb-1"><strong>Mention :</strong> {mobility.decision.mention}</p>
                      <p className="mb-1"><strong>Validateur :</strong> {mobility.decision.madeBy} <em>({mobility.decision.madeByRole})</em></p>
                      <p className="mb-2"><strong>Commentaire :</strong> {mobility.decision.comment || '-'}</p>
                      <div className="flex gap-4">
                        <a href={mobility.decision.pvPath} className="text-blue-600 underline hover:text-blue-800 font-medium" target="_blank" rel="noreferrer">Procès-Verbal</a>
                        <a href={mobility.decision.attestationPath} className="text-blue-600 underline hover:text-blue-800 font-medium" target="_blank" rel="noreferrer">Attestation</a>
                      </div>
                    </div>
                  ) : (
                    <p className="italic text-gray-500">Aucune décision enregistrée.</p>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 border-b pb-1 text-indigo-700">Documents</h4>
                  {mobility.documents.length === 0 ? (
                    <p className="italic text-gray-500">Aucun document.</p>
                  ) : (
                    mobility.documents.map(doc => (
                      <div key={doc.id} className="border rounded-xl p-3 bg-indigo-50 mb-3">
                        <p><strong>Type :</strong> {doc.type}</p>
                        <p><strong>Nom :</strong> {doc.originalFilename}</p>
                        <p><strong>Date d'upload :</strong> {doc.uploadDate}</p>
                        <a href={doc.filePath} className="text-blue-600 underline hover:text-blue-800 font-medium" target="_blank" rel="noreferrer">Télécharger</a>
                        <p><strong>OCR extrait :</strong> {doc.ocrExtracted ? 'Oui' : 'Non'}</p>
                      </div>
                    ))
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 border-b pb-1 text-indigo-700">Années Académiques & Modules</h4>
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
