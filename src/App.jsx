import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import MobilityDashboard from './pages/mobility/MobilityDashboard';
import CoordinatorDashboard from './pages/coordinator/CoordinatorDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import PartnerDashboard from './pages/partner/PartnerDashboard';

import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthGuard from './components/auth/AuthGuard';

import { USER_ROLES } from './utils/constants';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer l'utilisateur depuis localStorage (ou API)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirige racine vers login */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        {/* Route login */}
        <Route path="/auth/login" element={<Login />} />

        {/* Routes protégées et restreintes par rôle */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.SYSTEM_ADMIN, USER_ROLES.SCHOOL_ADMIN]}>
                <AdminDashboard />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mobility-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.MOBILITY_OFFICER]}>
                <MobilityDashboard />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.COORDINATOR]}>
                <CoordinatorDashboard />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentDashboard />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/partner-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.PARTNER]}>
                <PartnerDashboard />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        {/* Redirection fallback */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
