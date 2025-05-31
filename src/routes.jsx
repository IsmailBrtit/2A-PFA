import React from 'react';
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

export default function AppRoutes({ user }) {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.SYSTEM_ADMIN, USER_ROLES.SCHOOL_ADMIN]}>
                <AdminDashboard user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mobility-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.MOBILITY_OFFICER]}>
                <MobilityDashboard user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.COORDINATOR]}>
                <CoordinatorDashboard user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentDashboard user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/partner-dashboard"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.PARTNER]}>
                <PartnerDashboard user={user} />
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
