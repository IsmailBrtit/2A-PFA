import React, { useState, useEffect } from 'react';

// Valeurs des enums à utiliser en frontend (doivent correspondre au backend)
const ROLES = [
  'STUDENT',
  'PARTNER',
  'COORDINATOR',
  'MOBILITY_OFFICER',
  'SYSTEM_ADMIN',
];

const FILIERES = [
    'GL',
    'IDSIT',
    'GD',
    'SSI',
    'BIA',
    'SSE',
    'SSCL',
    'IA',
    'IDF'
];

// Validation simple format email
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

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
    department: '',
  });

  const [errors, setErrors] = useState({});

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
        department: user.department || '',
      });
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};

    // fullName obligatoire, 3+ caractères
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Le nom complet doit contenir au moins 3 caractères';
    }

    // Email obligatoire + format valide
    if (!formData.email) {
      newErrors.email = "L'email est obligatoire";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Le format de l'email est invalide";
    }

    // Role obligatoire et dans la liste
    if (!formData.role) {
      newErrors.role = 'Le rôle est obligatoire';
    } else if (!ROLES.includes(formData.role)) {
      newErrors.role = 'Rôle non valide';
    }

    // Règles spécifiques selon role
    if (formData.role === 'STUDENT' || formData.role === 'COORDINATOR') {
      if (!formData.filiere) {
        newErrors.filiere = 'La filière est obligatoire pour ce rôle';
      } else if (!FILIERES.includes(formData.filiere)) {
        newErrors.filiere = 'Filière non valide';
      }
    }

    if (formData.role === 'PARTNER') {
      if (!formData.universityName || formData.universityName.trim() === '') {
        newErrors.universityName = "Le nom de l'université est obligatoire";
      }
      if (!formData.country || formData.country.trim() === '') {
        newErrors.country = 'Le pays est obligatoire';
      }
      // gradingScale est optionnel
    }

    if (formData.role === 'MOBILITY_OFFICER') {
      if (!formData.department || formData.department.trim() === '') {
        newErrors.department = 'Le département est obligatoire';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md max-h-[90vh] overflow-auto"
      >
        <h2 className="text-xl font-bold mb-6">{formData.id ? 'Modifier utilisateur' : 'Ajouter utilisateur'}</h2>

        {/* Nom complet */}
        <label className="block mb-1 font-semibold">Nom complet *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full mb-3 border rounded px-3 py-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.fullName && <p className="text-red-600 mb-3">{errors.fullName}</p>}

        {/* Email */}
        <label className="block mb-1 font-semibold">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full mb-3 border rounded px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-600 mb-3">{errors.email}</p>}

        {/* Role */}
        <label className="block mb-1 font-semibold">Rôle *</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={formData.id && (formData.role === 'STUDENT' || formData.role === 'PARTNER')} // lock role for these
          className={`w-full mb-3 border rounded px-3 py-2 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">-- Sélectionner un rôle --</option>
          {ROLES.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.role && <p className="text-red-600 mb-3">{errors.role}</p>}

        {/* Filiere (si Student ou Coordinator) */}
        {(formData.role === 'STUDENT' || formData.role === 'COORDINATOR') && (
          <>
            <label className="block mb-1 font-semibold">Filière *</label>
            <select
              name="filiere"
              value={formData.filiere}
              onChange={handleChange}
              className={`w-full mb-3 border rounded px-3 py-2 ${errors.filiere ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">-- Sélectionner une filière --</option>
              {FILIERES.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            {errors.filiere && <p className="text-red-600 mb-3">{errors.filiere}</p>}
          </>
        )}

        {/* Partner fields */}
        {formData.role === 'PARTNER' && (
          <>
            <label className="block mb-1 font-semibold">Université *</label>
            <input
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              className={`w-full mb-3 border rounded px-3 py-2 ${errors.universityName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.universityName && <p className="text-red-600 mb-3">{errors.universityName}</p>}

            <label className="block mb-1 font-semibold">Pays *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full mb-3 border rounded px-3 py-2 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.country && <p className="text-red-600 mb-3">{errors.country}</p>}

            <label className="block mb-1 font-semibold">Échelle de notation</label>
            <input
              type="text"
              name="gradingScale"
              value={formData.gradingScale}
              onChange={handleChange}
              className="w-full mb-3 border rounded px-3 py-2"
            />
          </>
        )}

        {/* Mobility Officer fields */}
        {formData.role === 'MOBILITY_OFFICER' && (
          <>
            <label className="block mb-1 font-semibold">Département *</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full mb-3 border rounded px-3 py-2 ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.department && <p className="text-red-600 mb-3">{errors.department}</p>}
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
