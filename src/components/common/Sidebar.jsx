import React from 'react';
import { NavLink } from 'react-router-dom';
import { USER_ROLES } from '../../utils/constants';

const Sidebar = ({ role }) => {
  const linksByRole = {
    [USER_ROLES.SYSTEM_ADMIN]: [
      { to: '/admin-dashboard', label: 'Dashboard Admin' },
      { to: '/admin-users', label: 'Gestion Utilisateurs' },
      { to: '/admin-partners', label: 'Partenaires' },
      { to: '/admin/structure', label: 'Structure Académique' },
    ],
    [USER_ROLES.SCHOOL_ADMIN]: [
      { to: '/admin-dashboard', label: 'Dashboard Admin' },
      { to: '/admin/structure', label: 'Structure Académique' },
    ],
    [USER_ROLES.MOBILITY_OFFICER]: [
      { to: '/mobility-dashboard', label: 'Dashboard Mobilité' },
      { to: '/mobility-list', label: 'Liste Mobilités' },
      { to: '/mobility-create', label: 'Créer Mobilité' },
      { to: '/mobility-stats', label: 'Statistiques' },       // Nouveau lien vers stats
      { to: '/mobility/:mobilityId/documents/ocr-review', label: 'Validation OCR', hideInSidebar: true },

    ],
    [USER_ROLES.COORDINATOR]: [
      { to: '/coordinator-dashboard', label: 'Dashboard Coordinateur' },
      { to: '/validation', label: 'Validation Mobilités' },
    ],
    [USER_ROLES.STUDENT]: [
      { to: '/student-dashboard', label: 'Dashboard Étudiant' },
      { to: '/student-mobilities', label: 'Mes Mobilités' },
    ],
    [USER_ROLES.PARTNER]: [
      { to: '/partner-dashboard', label: 'Dashboard Partenaire' },
      { to: '/partner-upload', label: 'Upload Documents' },
    ],
  };

  const links = linksByRole[role] || [];

  return (
    <nav className="w-64 bg-white shadow-lg flex flex-col min-h-screen">
      {/* Logo / Title */}
      <div className="h-16 flex items-center justify-center font-extrabold text-blue-600 text-lg border-b border-gray-200">
        ENSIAS Mobility
      </div>

      {/* Navigation Links */}
      <ul className="flex-grow mt-4">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} end>
            {({ isActive }) => (
              <li
                className={`cursor-pointer px-6 py-3 mb-2 mx-4 rounded-lg transition-colors
                  ${isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-md'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
              >
                {label}
              </li>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Optional Footer or User Info */}
      <div className="p-4 border-t border-gray-200 text-gray-500 text-sm text-center">
        © 2025 ENSIAS Mobility
      </div>
    </nav>
  );
};

export default Sidebar;
