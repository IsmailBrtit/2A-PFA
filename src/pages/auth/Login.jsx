import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { USER_ROLES, ROUTES, ADMIN_ROLES } from '../../utils/constants';
import { authService } from '../../services/authService';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const token = await authService.login(credentials);
      const decoded = jwtDecode(token);

      console.log("🔐 Token decoded:", decoded); // <== debug

      const role =
        (decoded.role ||
          decoded.roles?.[0] ||
          decoded.authorities?.[0] ||
          '').replace('ROLE_', '');

      const user = {
        email: decoded.sub,
        role: role,
        fullName: decoded.fullName || 'Utilisateur',
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      if (ADMIN_ROLES.includes(user.role)) {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else if (user.role === USER_ROLES.MOBILITY_OFFICER) {
        navigate(ROUTES.MOBILITY_DASHBOARD);
      } else if (user.role === USER_ROLES.COORDINATOR) {
        navigate(ROUTES.COORDINATOR_DASHBOARD);
      } else if (user.role === USER_ROLES.STUDENT) {
        navigate(ROUTES.STUDENT_DASHBOARD);
      } else if (user.role === USER_ROLES.PARTNER) {
        navigate(ROUTES.PARTNER_DASHBOARD);
      } else {
        alert("Rôle utilisateur non reconnu.");
      }
    } catch (err) {
      console.error(err);
      alert('Email ou mot de passe incorrect');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;
