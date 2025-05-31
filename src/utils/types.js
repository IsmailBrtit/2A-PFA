// src/utils/types.js

/**
 * Enum des rôles utilisateurs
 */
export const USER_ROLES = {
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  MOBILITY_OFFICER: 'MOBILITY_OFFICER',
  COORDINATOR: 'COORDINATOR',
  STUDENT: 'STUDENT',
  PARTNER: 'PARTNER',
};

/**
 * Type User de base
 * @typedef {Object} User
 * @property {number} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} password
 * @property {string} role - Doit être une valeur de USER_ROLES
 */

/**
 * Type Student (hérite de User)
 * @typedef {User & Object} Student
 * @property {string} filiere
 * @property {number|null} partnerId
 * @property {number|null} mobilityId
 */

/**
 * Type Partner (hérite de User)
 * @typedef {User & Object} Partner
 * @property {string} universityName
 * @property {string} country
 * @property {string} gradingScale
 */

/**
 * Type Mobility
 * @typedef {Object} Mobility
 * @property {number} id
 * @property {string} program
 * @property {string} startDate - ISO string
 * @property {string} endDate - ISO string
 * @property {string} type
 * @property {string} status
 * @property {number} studentId
 * @property {number|null} decisionId
 */
