import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES, USER_ROLES } from '../utils/constants';

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    clearError
  } = useAuthStore();

  const loginUser = async (credentials) => {
    try {
      const user = await login(credentials);
      
      // Redirection selon le rôle
      const roleRoutes = {
        [USER_ROLES.SYSTEM_ADMIN]: ROUTES.SYSTEM_ADMIN_DASHBOARD,
        [USER_ROLES.SCHOOL_ADMIN]: ROUTES.SCHOOL_ADMIN_DASHBOARD,
        [USER_ROLES.MOBILITY_OFFICER]: ROUTES.MOBILITY_DASHBOARD,
        [USER_ROLES.COORDINATOR]: ROUTES.COORDINATOR_DASHBOARD,
        [USER_ROLES.STUDENT]: ROUTES.STUDENT_DASHBOARD,
        [USER_ROLES.PARTNER]: ROUTES.PARTNER_DASHBOARD
      };
      
      navigate(roleRoutes[user.role] || '/');
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: loginUser,
    logout: logoutUser,
    updateUser,
    clearError,
    hasRole,
    hasAnyRole
  };
};
