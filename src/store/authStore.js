import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService'; // ✅ Adjust path if needed
import {jwtDecode} from 'jwt-decode';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          const data = await authService.login(credentials);
          const decoded = jwtDecode(data.token); // JWT payload

          const user = {
            id: decoded.id,
            email: decoded.sub,
            role: decoded.role,
            fullName: decoded.fullName, // Adjust if your token includes it
          };

          set({
            user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });

          return user;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Erreur de connexion',
            isLoading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
        localStorage.removeItem('ensias-auth-storage'); // Optional cleanup
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'ensias-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
