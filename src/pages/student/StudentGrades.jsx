import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';
import Layout from '../../components/common/Layout';

const StudentGrades = ({ user }) => {
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
        setError("Erreur lors du chargement des notes.");
      } finally {
        setLoading(false);
      }
    };
    loadMobilities();
  }, []);

  if (loading) return <Layout user={user}><p>Chargement des notes...</p></Layout>;
  if (error) return <Layout user={user}><p className="text-red-600">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mes Notes</h1>
        {mobilities.length === 0 ? (
          <p>Aucune note disponible.</p>
        ) : (
          mobilities.map((mobility) => (
            <div key={mobility.id} className="mb-8 bg-white p-6 rounded shadow border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">{mobility.program} ({mobility.startDate} - {mobility.endDate})</h2>
              {mobility.academicYears.map((year) => (
                <div key={year.id} className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{year.yearLabel}</h3>
                  {year.semesters.map((semester) => (
                    <div key={semester.id} className="mb-4 pl-4 border-l-4 border-indigo-500">
                      <h4 className="font-semibold mb-2">{semester.label}</h4>
                      <table className="w-full table-auto border-collapse border">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1">Module</th>
                            <th className="border px-2 py-1">Note originale</th>
                            <th className="border px-2 py-1">Note convertie</th>
                            <th className="border px-2 py-1">ECTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {semester.modules.map((mod) => (
                            <tr key={mod.id}>
                              <td className="border px-2 py-1">{mod.name}</td>
                              <td className="border px-2 py-1">{mod.originalGrade}</td>
                              <td className="border px-2 py-1">{mod.convertedGrade}</td>
                              <td className="border px-2 py-1">{mod.ects}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default StudentGrades;
