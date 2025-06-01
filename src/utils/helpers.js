// src/utils/helpers.js

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} str 
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Retire les espaces en début et fin d'une chaîne
 * @param {string} str 
 * @returns {string}
 */
export function trimString(str) {
  return str ? str.trim() : '';
}

/**
 * Formate un texte long en le tronquant à maxLength avec "..."
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

/**
 * Vérifie si un objet est vide (sans propriétés)
 * @param {object} obj 
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
