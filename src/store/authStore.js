import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
          // Simulation d'une API call - remplacez par votre vraie API
          const mockUser = await mockLogin(credentials);
          
          set({
            user: mockUser,
            token: 'mock-jwt-token',
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          return mockUser;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
            isAuthenticated: false
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

// Mock login function - remplacez par votre vraie logique
const mockLogin = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  // Mock users database
  const mockUsers = {
    'admin@ensias.ma': {
      id: 1,
      email: 'admin@ensias.ma',
      name: 'Administrateur',
      role: 'SYSTEM_ADMIN'
    },
    'school@ensias.ma': {
      id: 2,
      email: 'school@ensias.ma',
      name: 'Admin École',
      role: 'SCHOOL_ADMIN'
    },
    'mobility@ensias.ma': {
      id: 3,
      email: 'mobility@ensias.ma',
      name: 'Agent Mobilité',
      role: 'MOBILITY_OFFICER'
    },
    'coord@ensias.ma': {
      id: 4,
      email: 'coord@ensias.ma',
      name: 'Coordinateur',
      role: 'COORDINATOR'
    },
    'student@ensias.ma': {
      id: 5,
      email: 'student@ensias.ma',
      name: 'Étudiant Test',
      role: 'STUDENT',
      filiere: 'Génie Informatique'
    },
    'partner@university.com': {
      id: 6,
      email: 'partner@university.com',
      name: 'Partenaire Test',
      role: 'PARTNER',
      universityName: 'University of Test',
      country: 'France',
      gradingScale: 'A-F'
    }
  };

  const user = mockUsers[credentials.email];
  
  if (!user || credentials.password !== 'password') {
    throw new Error('Email ou mot de passe incorrect');
  }
  
  return user;
};