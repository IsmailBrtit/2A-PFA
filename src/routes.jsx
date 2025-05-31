import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import Structure from './pages/admin/Structure';
import MobilityDashboard from './pages/mobility/MobilityDashboard';
import MobilityList from './pages/mobility/MobilityList'; 
import CreateMobility from './pages/mobility/CreateMobility';
import MobilityDocuments from './pages/mobility/MobilityDocuments';
import MobilityStats from './pages/mobility/MobilityStats';
import OcrReview from './pages/mobility/OcrReview'; // adapte le chemin si besoin
import CoordinatorDashboard from './pages/coordinator/CoordinatorDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import PartnerDashboard from './pages/partner/PartnerDashboard';
import ProfilePage from './pages/profile/ProfilePage';
import Partners from './pages/admin/Partners';
import Users from './pages/admin/Users';

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
          path="/admin-partners"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.SYSTEM_ADMIN, USER_ROLES.SCHOOL_ADMIN]}>
                <Partners user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-users"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.SYSTEM_ADMIN, USER_ROLES.SCHOOL_ADMIN]}>
                <Users user={user} />
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

        <Route
          path="/admin/structure"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.SYSTEM_ADMIN, USER_ROLES.SCHOOL_ADMIN]}>
                <Structure user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mobility-create"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.MOBILITY_OFFICER]}>
                <CreateMobility user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />


      <Route
        path="/mobility-list"
        element={
          <ProtectedRoute user={user}>
            <AuthGuard user={user} allowedRoles={[USER_ROLES.MOBILITY_OFFICER]}>
              <MobilityList user={user} />
            </AuthGuard>
          </ProtectedRoute>
          }
        />

        <Route
          path="/mobility/:mobilityId/documents"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.MOBILITY_OFFICER]}>
                <MobilityDocuments user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mobility-stats"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.MOBILITY_OFFICER]}>
                <MobilityStats user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mobility/:mobilityId/documents/ocr-review"
          element={
            <ProtectedRoute user={user}>
              <AuthGuard user={user} allowedRoles={[USER_ROLES.MOBILITY_OFFICER]}>
                <OcrReview user={user} />
              </AuthGuard>
            </ProtectedRoute>
          }
        />


        <Route
         path="/profile"
         element={
          <ProtectedRoute user={user}>
            <AuthGuard user={user} allowedRoles={[USER_ROLES.SYSTEM_ADMIN, USER_ROLES.SCHOOL_ADMIN, USER_ROLES.MOBILITY_OFFICER, USER_ROLES.COORDINATOR, USER_ROLES.STUDENT, USER_ROLES.PARTNER]}>
              <ProfilePage user={user} />
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
