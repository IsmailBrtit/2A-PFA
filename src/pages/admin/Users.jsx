import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import UserForm from '../../components/forms/UserForm';
import Button from '../../components/ui/Button';
import * as userService from '../../services/userService';

const Users = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.fetchUsers();
      setUsers(data);
      setError(null);
    } catch {
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    try {
      await userService.deleteUser(id);
      loadUsers();
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleFormSubmit = async (userData) => {
    try {
      if (userData.id) {
        await userService.updateUser(userData.id, userData);
      } else {
        await userService.createUser(userData);
      }
      handleFormClose();
      loadUsers();
    } catch {
      alert('Erreur lors de la sauvegarde');
    }
  };

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Button onClick={() => setShowForm(true)} className="mb-6">
          Ajouter un utilisateur
        </Button>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4">Nom complet</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Rôle</th>
                <th className="py-2 px-4">Filière / Université</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                users.map(u => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{u.fullName}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.role}</td>
                    <td className="py-2 px-4">
                      {u.role === 'STUDENT' ? u.filiere || '-' : u.role === 'PARTNER' ? u.universityName || '-' : '-'}
                    </td>
                    <td className="py-2 px-4 flex gap-4">
                      <Button variant="link" onClick={() => handleEdit(u)}>
                        Modifier
                      </Button>
                      <Button variant="link" color="danger" onClick={() => handleDelete(u.id)}>
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {showForm && (
          <UserForm
            user={editingUser}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </Layout>
  );
};

export default Users;
