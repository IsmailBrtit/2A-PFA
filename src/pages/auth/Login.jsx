import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { USER_ROLES, ROUTES } from '../../utils/constants';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    // Mock authentification - remplacez par votre logique réelle
    const mockUsers = {
  'admin@ensias.ma': { id: 1, role: USER_ROLES.SYSTEM_ADMIN, fullName: 'System Admin' },
  'school@ensias.ma': { id: 2, role: USER_ROLES.SCHOOL_ADMIN, fullName: 'School Admin' },
  'mobility@ensias.ma': { id: 3, role: USER_ROLES.MOBILITY_OFFICER, fullName: 'Mobility Officer' },
  'coord@ensias.ma': { id: 4, role: USER_ROLES.COORDINATOR, fullName: 'Coordinator' },
  'student@ensias.ma': { id: 5, role: USER_ROLES.STUDENT, fullName: 'Student Example' },
  'partner@university.com': { id: 6, role: USER_ROLES.PARTNER, fullName: 'Partner Example' }
};


    const user = mockUsers[credentials.email];
    
    if (user && credentials.password === 'password') {
      // Stocker les infos utilisateur (remplacez par votre système de gestion d'état)
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: credentials.email,
        role: user.role,
        fullName: user.fullName,
      }));

      // Rediriger selon le rôle
      switch (user.role) {
        case USER_ROLES.SYSTEM_ADMIN:
        case USER_ROLES.SCHOOL_ADMIN:
          navigate(ROUTES.ADMIN_DASHBOARD);
          break;
        case USER_ROLES.MOBILITY_OFFICER:
          navigate(ROUTES.MOBILITY_DASHBOARD);
          break;
        case USER_ROLES.COORDINATOR:
          navigate(ROUTES.COORDINATOR_DASHBOARD);
          break;
        case USER_ROLES.STUDENT:
          navigate(ROUTES.STUDENT_DASHBOARD);
          break;
        case USER_ROLES.PARTNER:
          navigate(ROUTES.PARTNER_DASHBOARD);
          break;
        default:
          console.error('Rôle utilisateur non reconnu');
      }
    } else {
      alert('Email ou mot de passe incorrect');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;