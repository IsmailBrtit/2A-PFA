import React, { useState, useEffect } from 'react';
import Layout from '../../components/common/Layout';
import useMobilities from '../../hooks/useMobilities';

const statusLabels = {
  PREPARATION: 'Préparation',
  PENDING_DOCS: 'En attente',
  VERIFIED: 'Vérifié',
  COMMISSION: 'En commission',
  VALIDATED: 'Validé',
  REJECTED: 'Rejeté',
};

const filieres = ['GL', 'IDSIT', 'GD', 'SSI', 'BIA', 'SSE', 'SSCL', 'IA', 'IDF'];

const MobilityStats = ({ user }) => {
  const { mobilities, loading, error } = useMobilities();

  // Filtres
  const [filterAcademicYear, setFilterAcademicYear] = useState('');
  const [filterFiliere, setFilterFiliere] = useState('');
  const [filterPartner, setFilterPartner] = useState('');

  // Extraire années académiques disponibles et partenaires uniques pour filtres
  const [availableAcademicYears, setAvailableAcademicYears] = useState([]);
  const [availablePartners, setAvailablePartners] = useState([]);

  useEffect(() => {
    if (!mobilities) return;

    // Années académiques distinctes
    const yearsSet = new Set();
    const partnersSet = new Set();

    mobilities.forEach(mob => {
      mob.academicYears?.forEach(year => {
        if (year.yearLabel) yearsSet.add(year.yearLabel);
      });

      if (mob.student?.partner?.universityName) {
        partnersSet.add(mob.student.partner.universityName);
      }
    });

    setAvailableAcademicYears([...yearsSet].sort());
    setAvailablePartners([...partnersSet].sort());
  }, [mobilities]);

  if (loading) return <Layout user={user}><p className="p-6">Chargement...</p></Layout>;
  if (error) return <Layout user={user}><p className="p-6 text-red-500">{error}</p></Layout>;

  // Appliquer filtres sur les mobilités
  const filteredMobilities = mobilities.filter(mob => {
    if (filterAcademicYear && !mob.academicYears?.some(y => y.yearLabel === filterAcademicYear)) {
      return false;
    }
    if (filterFiliere && mob.student?.filiere !== filterFiliere) {
      return false;
    }
    if (filterPartner && mob.student?.partner?.universityName !== filterPartner) {
      return false;
    }
    return true;
  });

  // Calcul des stats après filtres
  const countsByStatus = {};
  Object.keys(statusLabels).forEach(status => {
    countsByStatus[status] = filteredMobilities.filter(m => m.status === status).length;
  });

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Statistiques des mobilités</h1>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div>
            <label htmlFor="academicYearFilter" className="mr-2 font-semibold">Année académique :</label>
            <select
              id="academicYearFilter"
              value={filterAcademicYear}
              onChange={e => setFilterAcademicYear(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Toutes</option>
              {availableAcademicYears.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filiereFilter" className="mr-2 font-semibold">Filière :</label>
            <select
              id="filiereFilter"
              value={filterFiliere}
              onChange={e => setFilterFiliere(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Toutes</option>
              {filieres.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="partnerFilter" className="mr-2 font-semibold">Partenaire :</label>
            <select
              id="partnerFilter"
              value={filterPartner}
              onChange={e => setFilterPartner(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Tous</option>
              {availablePartners.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-6">
          {Object.entries(countsByStatus).map(([status, count]) => (
            <div key={status} className="bg-white rounded shadow p-6 flex flex-col items-center">
              <span className="text-gray-700 uppercase font-semibold">{statusLabels[status]}</span>
              <span className="text-4xl font-bold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MobilityStats;
