import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Vérifie que l'utilisateur a un rôle autorisé.
 * Sinon, redirige vers login (ou page accès refusé à créer).
 * 
 * @param {object} props
 * @param {object} props.user - Objet utilisateur avec propriété `role`
 * @param {string[]} props.allowedRoles - Liste des rôles autorisés
 * @param {React.ReactNode} props.children - Composant à afficher si autorisé
 */
const AuthGuard = ({ user, allowedRoles, children }) => {
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AuthGuard;
