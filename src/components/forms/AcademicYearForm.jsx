import React, { useEffect, useState } from 'react';

const AcademicYearForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [yearLabel, setYearLabel] = useState('');

  useEffect(() => {
    if (initialData) {
      setYearLabel(initialData.yearLabel);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!yearLabel.trim()) {
      alert('Le libellé de l’année académique est requis');
      return;
    }
    onSubmit({ yearLabel });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-medium">Libellé de l’année académique *</label>
      <input
        type="text"
        value={yearLabel}
        onChange={(e) => setYearLabel(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Exemple : 2023-2024"
      />
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default AcademicYearForm;
