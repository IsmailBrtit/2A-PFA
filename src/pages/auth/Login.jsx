import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { USER_ROLES, ROUTES } from '../../utils/constants';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    // Mock authentification - remplacez par votre logique réelle
    const mockUsers = {
      'admin@ensias.ma': { role: USER_ROLES.SYSTEM_ADMIN, name: 'System Admin' },
      'school@ensias.ma': { role: USER_ROLES.SCHOOL_ADMIN, name: 'School Admin' },
      'mobility@ensias.ma': { role: USER_ROLES.MOBILITY_OFFICER, name: 'Mobility Officer' },
      'coord@ensias.ma': { role: USER_ROLES.COORDINATOR, name: 'Coordinator' },
      'student@ensias.ma': { role: USER_ROLES.STUDENT, name: 'Student' },
      'partner@university.com': { role: USER_ROLES.PARTNER, name: 'Partner' }
    };

    const user = mockUsers[credentials.email];
    
    if (user && credentials.password === 'password') {
      // Stocker les infos utilisateur (remplacez par votre système de gestion d'état)
      localStorage.setItem('user', JSON.stringify({
        email: credentials.email,
        role: user.role,
        name: user.name
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