// 🔐 Rôles utilisateurs (basés sur votre enum Role)
export const USER_ROLES = {
  STUDENT: 'STUDENT',
  MOBILITY_OFFICER: 'MOBILITY_OFFICER',
  COORDINATOR: 'COORDINATOR',
  PARTNER: 'PARTNER',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN'
};

// 🏷️ Labels en français pour les rôles
export const ROLE_LABELS = {
  [USER_ROLES.STUDENT]: 'Étudiant',
  [USER_ROLES.MOBILITY_OFFICER]: 'Agent de Mobilité',
  [USER_ROLES.COORDINATOR]: 'Coordinateur',
  [USER_ROLES.PARTNER]: 'Partenaire',
  [USER_ROLES.SCHOOL_ADMIN]: 'Administrateur École',
  [USER_ROLES.SYSTEM_ADMIN]: 'Super Administrateur'
};

// 🎯 Routes principales par rôle
export const ROUTES = {
  // Auth
  LOGIN: '/auth',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin-dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_PARTNERS: '/admin/partners',
  ADMIN_STRUCTURE: '/admin/structure',
  ADMIN_MOBILITIES: '/admin/mobilities',
  ADMIN_STATS: '/admin/stats',
  ADMIN_DOCUMENTS: '/admin/documents',
  
  // Mobility Officer routes
  MOBILITY_DASHBOARD: '/mobility-dashboard',
  MOBILITY_CREATE: '/mobility/create',
  MOBILITY_LIST: '/mobility/list',
  MOBILITY_DOCUMENTS: '/mobility/documents',
  MOBILITY_OCR_REVIEW: '/mobility/ocr-review',
  MOBILITY_STATS: '/mobility/stats',
  
  // Coordinator routes
  COORDINATOR_DASHBOARD: '/coordinator-dashboard',
  COORDINATOR_VALIDATE: '/coordination/validate',
  COORDINATOR_HISTORY: '/coordination/history',
  
  // Student routes
  STUDENT_DASHBOARD: '/student-dashboard',
  STUDENT_MOBILITIES: '/student/mobilities',
  STUDENT_GRADES: '/student/grades',
  STUDENT_DOCUMENTS: '/student/documents',
  STUDENT_STATUS: '/student/status',
  
  // Partner routes
  PARTNER_DASHBOARD: '/partner-dashboard',
  PARTNER_UPLOAD: '/partner/upload',
  PARTNER_VALIDATION_STATUS: '/partner/validation-status',
  PARTNER_STUDENTS: '/partner/students'
};

// 📊 Statuts de mobilité (basés sur votre enum MobilityStatus)
export const MOBILITY_STATUS = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED'
};

export const MOBILITY_STATUS_LABELS = {
  [MOBILITY_STATUS.DRAFT]: 'Brouillon',
  [MOBILITY_STATUS.SUBMITTED]: 'Soumis',
  [MOBILITY_STATUS.UNDER_REVIEW]: 'En cours d\'examen',
  [MOBILITY_STATUS.APPROVED]: 'Approuvé',
  [MOBILITY_STATUS.REJECTED]: 'Rejeté',
  [MOBILITY_STATUS.COMPLETED]: 'Terminé'
};

// 🎓 Filières (vous pouvez ajuster selon votre enum Filiere)
export const FILIERES = {
  GENIE_INFORMATIQUE: 'GENIE_INFORMATIQUE',
  GENIE_INDUSTRIEL: 'GENIE_INDUSTRIEL',
  GENIE_CIVIL: 'GENIE_CIVIL',
  GENIE_ELECTRIQUE: 'GENIE_ELECTRIQUE'
};

export const FILIERE_LABELS = {
  [FILIERES.GENIE_INFORMATIQUE]: 'Génie Informatique',
  [FILIERES.GENIE_INDUSTRIEL]: 'Génie Industriel',
  [FILIERES.GENIE_CIVIL]: 'Génie Civil',
  [FILIERES.GENIE_ELECTRIQUE]: 'Génie Électrique'
};

// 🌍 Configuration API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  ENDPOINTS: {
    AUTH: '/auth',
    USERS: '/users',
    STUDENTS: '/students',
    PARTNERS: '/partners',
    MOBILITIES: '/mobilities',
    DOCUMENTS: '/documents',
    DECISIONS: '/decisions'
  }
};

// 📝 Messages d'interface
export const UI_MESSAGES = {
  LOADING: 'Chargement...',
  ERROR: 'Une erreur est survenue',
  SUCCESS: 'Opération réussie',
  CONFIRM_DELETE: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  NO_DATA: 'Aucune donnée disponible',
  UNAUTHORIZED: 'Accès non autorisé',
  LOGIN_REQUIRED: 'Connexion requise'
};

// 🎨 Configuration UI
export const UI_CONFIG = {
  ITEMS_PER_PAGE: 10,
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 200
};