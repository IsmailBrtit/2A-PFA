import { useState, useEffect } from 'react';
import * as mobilityService from '../services/mobilityService';

export default function useMobilities() {
  const [mobilities, setMobilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger toutes les mobilités
  const loadMobilities = async () => {
    setLoading(true);
    try {
      const data = await mobilityService.fetchMobilities();
      setMobilities(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des mobilités');
    } finally {
      setLoading(false);
    }
  };

  // Création d’une mobilité
  const createMobility = async (mobilityData) => {
    try {
      const newMobility = await mobilityService.createMobility(mobilityData);
      setMobilities(prev => [...prev, newMobility]);
      return newMobility;
    } catch (err) {
      throw new Error('Erreur lors de la création');
    }
  };

  // Mise à jour d’une mobilité
  const updateMobility = async (id, mobilityData) => {
    try {
      const updated = await mobilityService.updateMobility(id, mobilityData);
      setMobilities(prev => prev.map(m => (m.id === id ? updated : m)));
      return updated;
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour');
    }
  };

  // Suppression d’une mobilité
  const deleteMobility = async (id) => {
    try {
      await mobilityService.deleteMobility(id);
      setMobilities(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      throw new Error('Erreur lors de la suppression');
    }
  };

  useEffect(() => {
    loadMobilities();
  }, []);

  return {
    mobilities,
    loading,
    error,
    loadMobilities,
    createMobility,
    updateMobility,
    deleteMobility,
  };
}
