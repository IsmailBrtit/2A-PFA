import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  const isProfileActive = location.pathname === '/profile';

  return (
    <header className="flex items-center justify-end bg-white shadow px-6 h-16">
      {/*<div className="text-xl font-bold text-blue-700">ENSIAS Mobilité</div>*/}

      <div className="flex items-center space-x-4">
        <div
          onClick={goToProfile}
          className={`font-medium cursor-pointer transition px-3 py-1 rounded 
            ${isProfileActive 
              ? 'bg-indigo-100 text-indigo-700 shadow-inner' 
              : 'text-gray-900 bg-gray-300 hover:text-black hover:bg-gray-400'
            }`}
          title="Voir mon profil"
        >
          {user?.fullName || 'Utilisateur'}
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
};

export default Header;