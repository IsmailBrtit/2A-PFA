import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import * as userService from '../../services/userService';
//import {userService } from '../../services/userService';
//import * as partnerService from '../../services/partnerService';
import { partnerService } from '../../services/partnerService';

function Card({ title, count }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center justify-center">
      <h3 className="text-gray-500 uppercase text-sm">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}

const AdminDashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService.fetchUsers()
      .then(data => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des utilisateurs');
        setLoadingUsers(false);
      });

    partnerService.getAll()
      .then(data => {
        setPartners(data);
        setLoadingPartners(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des partenaires');
        setLoadingPartners(false);
      });
  }, []);

  return (
    <Layout user={user}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card title="Utilisateurs" count={users.length} />
          <Card title="Partenaires" count={partners.length} />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
          {loadingUsers ? (
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
                {users.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{user.fullName}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">
                      {user.role === 'STUDENT' ? user.filiere || '-' :
                       user.role === 'PARTNER' ? user.universityName || '-' : '-'}
                    </td>
                    <td className="py-2 px-4">
                      <button className="text-blue-600 hover:underline mr-2">Modifier</button>
                      <button className="text-red-600 hover:underline">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Liste des partenaires</h2>
          {loadingPartners ? (
            <p>Chargement...</p>
          ) : (
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-2 px-4">Université</th>
                  <th className="py-2 px-4">Pays</th>
                  <th className="py-2 px-4">Échelle de notation</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map(partner => (
                  <tr key={partner.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{partner.universityName}</td>
                    <td className="py-2 px-4">{partner.country}</td>
                    <td className="py-2 px-4">{partner.gradingScale}</td>
                    <td className="py-2 px-4">
                      <button className="text-blue-600 hover:underline mr-2">Modifier</button>
                      <button className="text-red-600 hover:underline">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
