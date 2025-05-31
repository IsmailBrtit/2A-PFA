import React from 'react';
import { NavLink } from 'react-router-dom';
import { USER_ROLES } from '../../utils/constants';

const Sidebar = ({ role }) => {
  // Liens selon rôle
  const linksByRole = {
    [USER_ROLES.SYSTEM_ADMIN]: [
      { to: '/admin-dashboard', label: 'Dashboard Admin' },
      { to: '/admin-users', label: 'Gestion Utilisateurs' },
      { to: '/admin-partners', label: 'Partenaires' },
      // Ajoute d'autres liens admin ici
    ],
    [USER_ROLES.SCHOOL_ADMIN]: [
      { to: '/admin-dashboard', label: 'Dashboard Admin' },
      // Similaire SYSTEM_ADMIN ou moins selon besoin
    ],
    [USER_ROLES.MOBILITY_OFFICER]: [
      { to: '/mobility-dashboard', label: 'Dashboard Mobilité' },
      { to: '/mobility-list', label: 'Mobilités' },
      // etc.
    ],
    [USER_ROLES.COORDINATOR]: [
      { to: '/coordinator-dashboard', label: 'Dashboard Coordinateur' },
      { to: '/validation', label: 'Validation Mobilités' },
      // etc.
    ],
    [USER_ROLES.STUDENT]: [
      { to: '/student-dashboard', label: 'Dashboard Étudiant' },
      { to: '/student-mobilities', label: 'Mes Mobilités' },
      // etc.
    ],
    [USER_ROLES.PARTNER]: [
      { to: '/partner-dashboard', label: 'Dashboard Partenaire' },
      { to: '/partner-upload', label: 'Upload Documents' },
      // etc.
    ],
  };

  const links = linksByRole[role] || [];

  return (
    <nav className="w-64 bg-white shadow-md flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-blue-700 border-b">
        ENSIAS Mobility
      </div>
      <ul className="flex-grow p-4 space-y-2">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-200 font-semibold' : ''
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
