import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import * as userService from '../../services/userService';

const ProfilePage = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await userService.fetchUserById(user.id);
        setProfile(data);
        setFormData(data || {});
      } catch {
        setError('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const updated = await userService.updateUser(user.id, formData);
      setProfile(updated);
      setEditMode(false);
    } catch {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout user={user}><p className="p-6">Chargement...</p></Layout>;
  if (error && !editMode) return <Layout user={user}><p className="p-6 text-red-500">{error}</p></Layout>;

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-3">Mon Profil</h1>

        {!profile && <p className="italic text-gray-500">Profil indisponible.</p>}

        {profile && !editMode && (
          <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                <dd className="mt-1 text-lg text-gray-900">{profile.fullName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-lg text-gray-900">{profile.email}</dd>
              </div>

              {profile.role === 'STUDENT' && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Filière</dt>
                    <dd className="mt-1 text-lg text-gray-900">{profile.filiere}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Partenaire</dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {profile.partner
                        ? `${profile.partner.universityName} (${profile.partner.country})`
                        : '-'}
                    </dd>
                  </div>
                </>
              )}

              {profile.role === 'PARTNER' && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Université</dt>
                    <dd className="mt-1 text-lg text-gray-900">{profile.universityName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Pays</dt>
                    <dd className="mt-1 text-lg text-gray-900">{profile.country}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Échelle de notation</dt>
                    <dd className="mt-1 text-lg text-gray-900">{profile.gradingScale}</dd>
                  </div>
                </>
              )}
            </dl>
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Modifier
            </button>
          </div>
        )}

        {profile && editMode && (
          <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {profile.role === 'STUDENT' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filière</label>
                  <input
                    type="text"
                    name="filiere"
                    value={formData.filiere || ''}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partenaire</label>
                  <input
                    type="text"
                    name="partnerName"
                    value={formData.partner?.universityName || ''}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </>
            )}

            {profile.role === 'PARTNER' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Université</label>
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName || ''}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Échelle de notation</label>
                  <input
                    type="text"
                    name="gradingScale"
                    value={formData.gradingScale || ''}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </>
            )}

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
              >
                {saving ? 'Enregistrement...' : 'Sauvegarder'}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setFormData(profile);
                  setError(null);
                }}
                disabled={saving}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
