import React from 'react';

const Header = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 h-16">
      <div className="text-xl font-bold text-blue-700">ENSIAS Mobility</div>

      <div className="flex items-center space-x-4">
        <div className="text-gray-700 font-medium">{user?.fullName || 'Utilisateur'}</div>
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
