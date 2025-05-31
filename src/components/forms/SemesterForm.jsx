import React, { useEffect, useState } from 'react';

const SEMESTER_TYPES = ['NORMAL', 'PFE'];

const SemesterForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState('NORMAL');

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label);
      setType(initialData.type);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) {
      alert('Le libellé du semestre est requis');
      return;
    }
    onSubmit({ label, type });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-medium">Libellé du semestre *</label>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Exemple : S1, Fall 2023"
      />

      <label className="block font-medium mt-4">Type de semestre *</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        {SEMESTER_TYPES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

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

export default SemesterForm;
