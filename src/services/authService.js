import api from './apis';

export const authService = {
  /**
   * 🔐 Log in and store token
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  },

  /**
   * 🚪 Logout: just remove the token
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * ✅ Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * 👤 Get current logged-in user info
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * 📝 Update user profile
   */
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  /**
   * 🔑 Change password
   */
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  }
};
