import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ user, children }) => {
    console.log('Layout user:', user);
  console.log('Layout user.role:', user?.role);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role={user?.role} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Header user={user} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
