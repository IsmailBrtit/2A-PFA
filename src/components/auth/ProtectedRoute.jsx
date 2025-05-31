import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Vérifie si l'utilisateur est connecté.
 * Si non, redirige vers la page de login.
 * 
 * @param {object} props
 * @param {object|null} props.user - Objet utilisateur ou null si non connecté
 * @param {React.ReactNode} props.children - Composant à afficher si connecté
 */
const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();

  if (!user) {
    // Redirige vers login en conservant la page demandée dans "state"
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
