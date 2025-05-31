import React, { useState, useEffect } from 'react';

const roles = ['STUDENT', 'PARTNER', 'COORDINATOR', 'MOBILITY_OFFICER', 'SYSTEM_ADMIN', 'SCHOOL_ADMIN'];
const filieres = ['', 'GL', 'IDSIT', 'GD', 'SSI', 'BIA', 'SSE', 'SSCL', 'IA', 'IDF'];

const UserForm = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: null,
    fullName: '',
    email: '',
    role: '',
    filiere: '',
    universityName: '',
    country: '',
    gradingScale: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || null,
        fullName: user.fullName || '',
        email: user.email || '',
        role: user.role || '',
        filiere: user.filiere || '',
        universityName: user.universityName || '',
        country: user.country || '',
        gradingScale: user.gradingScale || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.role) {
      alert('Veuillez remplir les champs requis');
      return;
    }

    // Clear filiere and partner fields if role is not student or partner
    if (formData.role !== 'STUDENT') {
      formData.filiere = '';
    }
    if (formData.role !== 'PARTNER') {
      formData.universityName = '';
      formData.country = '';
      formData.gradingScale = '';
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-6">{formData.id ? 'Modifier utilisateur' : 'Ajouter utilisateur'}</h2>

        <label className="block mb-2 font-medium">Nom complet *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 border rounded px-3 py-2"
          required
        />

        <label className="block mb-2 font-medium">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 border rounded px-3 py-2"
          required
        />

        <label className="block mb-2 font-medium">Rôle *</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-4 border rounded px-3 py-2"
          required
        >
          <option value="">-- Sélectionner un rôle --</option>
          {roles.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {formData.role === 'STUDENT' && (
          <>
            <label className="block mb-2 font-medium">Filière</label>
            <select
              name="filiere"
              value={formData.filiere}
              onChange={handleChange}
              className="w-full mb-4 border rounded px-3 py-2"
            >
              <option value="">-- Sélectionner une filière --</option>
              {filieres.filter(f => f !== '').map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </>
        )}

        {formData.role === 'PARTNER' && (
          <>
            <label className="block mb-2 font-medium">Université</label>
            <input
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              className="w-full mb-4 border rounded px-3 py-2"
            />
            <label className="block mb-2 font-medium">Pays</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full mb-4 border rounded px-3 py-2"
            />
            <label className="block mb-2 font-medium">Échelle de notation</label>
            <input
              type="text"
              name="gradingScale"
              value={formData.gradingScale}
              onChange={handleChange}
              className="w-full mb-4 border rounded px-3 py-2"
            />
          </>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
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
    </div>
  );
};

export default UserForm;
