import React from 'react';
import { useNavigate } from 'react-router-dom';


const Header = ({ user }) => {
  const navigate = useNavigate()
 
  const goToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 h-16">
      <div className="text-xl font-bold text-blue-700">ENSIAS Mobilité</div>

      <div className="flex items-center space-x-4">
        <div onClick={goToProfile} 
        className="text-gray-700 font-medium"
         title="Voir mon profil">{user?.fullName || 'Utilisateur'}</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
};

export default Header;
