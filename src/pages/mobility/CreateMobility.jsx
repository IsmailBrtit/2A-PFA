import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import MobilityForm from '../../components/forms/MobilityForm';
import * as mobilityService from '../../services/mobilityService';
import { useNavigate } from 'react-router-dom';

const CreateMobility = ({ user }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await mobilityService.createMobility(data);
      navigate('/mobility-list');
    } catch {
      setError('Erreur lors de la création de la mobilité');
    }
  };

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Créer une nouvelle mobilité</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <MobilityForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default CreateMobility;
