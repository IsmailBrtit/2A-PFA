import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import AcademicYearForm from '../../components/forms/AcademicYearForm';
import SemesterForm from '../../components/forms/SemesterForm';
import { academicYearService } from '../../services/academicYearService';
import { semesterService } from '../../services/semesterService';

const Structure = ({ user }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [loadingYears, setLoadingYears] = useState(true);
  const [error, setError] = useState(null);

  const [selectedYear, setSelectedYear] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [loadingSemesters, setLoadingSemesters] = useState(false);

  const [showYearForm, setShowYearForm] = useState(false);
  const [yearToEdit, setYearToEdit] = useState(null);

  const [showSemesterForm, setShowSemesterForm] = useState(false);
  const [semesterToEdit, setSemesterToEdit] = useState(null);

  useEffect(() => {
    loadAcademicYears();
  }, []);

  const loadAcademicYears = async () => {
    try {
      setLoadingYears(true);
      const data = await academicYearService.getAll();
      setAcademicYears(data);
      setError(null);
    } catch {
      setError('Erreur lors du chargement des années académiques');
    } finally {
      setLoadingYears(false);
    }
  };

  const loadSemesters = async (year) => {
    try {
      setLoadingSemesters(true);
      setSelectedYear(year);
      const data = await semesterService.getByAcademicYearId(year.id);
      setSemesters(data);
      setError(null);
    } catch {
      setError('Erreur lors du chargement des semestres');
    } finally {
      setLoadingSemesters(false);
    }
  };

  const handleYearEdit = (year) => {
    setYearToEdit(year);
    setShowYearForm(true);
  };

  const handleYearDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette année académique ?')) return;
    await academicYearService.delete(id);
    if(selectedYear && selectedYear.id === id) setSelectedYear(null);
    loadAcademicYears();
  };

  const handleYearFormSubmit = async (yearData) => {
    if (yearToEdit) {
      await academicYearService.update(yearToEdit.id, yearData);
    } else {
      await academicYearService.create(yearData);
    }
    setShowYearForm(false);
    setYearToEdit(null);
    loadAcademicYears();
  };

  const handleSemesterEdit = (semester) => {
    setSemesterToEdit(semester);
    setShowSemesterForm(true);
  };

  const handleSemesterDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce semestre ?')) return;
    await semesterService.delete(id);
    loadSemesters(selectedYear);
  };

  const handleSemesterFormSubmit = async (semesterData) => {
    if (semesterToEdit) {
      await semesterService.update(semesterToEdit.id, semesterData);
    } else {
      await semesterService.create({ ...semesterData, academic_year_id: selectedYear.id });
    }
    setShowSemesterForm(false);
    setSemesterToEdit(null);
    loadSemesters(selectedYear);
  };

  return (
    <Layout user={user} >
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Gestion de la structure académique</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Années académiques</h2>
            <button
              onClick={() => setShowYearForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Ajouter une année
            </button>
          </div>

          {loadingYears ? (
            <p>Chargement...</p>
          ) : (
            <ul className="bg-white shadow rounded p-4 max-h-96 overflow-auto">
              {academicYears.length === 0 && (
                <li className="text-gray-500 italic">Aucune année académique trouvée.</li>
              )}
              {academicYears.map(year => (
                <li
                  key={year.id}
                  className={`p-3 border-b cursor-pointer ${
                    selectedYear?.id === year.id ? 'bg-blue-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => loadSemesters(year)}
                >
                  <div className="flex justify-between items-center">
                    <span>{year.yearLabel}</span>
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleYearEdit(year);
                        }}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleYearDelete(year.id);
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Semestres</h2>
            {selectedYear && (
              <button
                onClick={() => setShowSemesterForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Ajouter un semestre
              </button>
            )}
          </div>

          {loadingSemesters ? (
            <p>Chargement...</p>
          ) : (
            <ul className="bg-white shadow rounded p-4 max-h-96 overflow-auto">
              {semesters.length === 0 && (
                <li className="text-gray-500 italic">Aucun semestre trouvé.</li>
              )}
              {semesters.map(sem => (
                <li key={sem.id} className="p-3 border-b flex justify-between items-center">
                  <span>{sem.label} ({sem.type})</span>
                  <div>
                    <button
                      onClick={() => handleSemesterEdit(sem)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleSemesterDelete(sem.id)}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {showYearForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <AcademicYearForm
              initialData={yearToEdit}
              onSubmit={handleYearFormSubmit}
              onCancel={() => {
                setShowYearForm(false);
                setYearToEdit(null);
              }}
            />
          </div>
        )}

        {showSemesterForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <SemesterForm
              initialData={semesterToEdit}
              onSubmit={handleSemesterFormSubmit}
              onCancel={() => {
                setShowSemesterForm(false);
                setSemesterToEdit(null);
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Structure;
