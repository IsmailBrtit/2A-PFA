import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Vérifie que l'utilisateur a un rôle autorisé.
 * Sinon, redirige vers login (ou page accès refusé à créer).
 * 
 * @param {object} props
 * @param {object} [props.user] - Objet utilisateur avec propriété `role`
 * @param {string[]} props.allowedRoles - Liste des rôles autorisés
 * @param {React.ReactNode} props.children - Composant à afficher si autorisé
 */
const AuthGuard = ({ user, allowedRoles, children }) => {
  const storedUser = user || JSON.parse(localStorage.getItem('user'));

  if (!storedUser || !allowedRoles.includes(storedUser.role)) {
    return <Navigate to="/auth/login" replace />;
    // Alternatively: return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default AuthGuard;
