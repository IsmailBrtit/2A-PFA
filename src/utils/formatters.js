// src/utils/formatters.js

/**
 * Formate une date ISO en format "JJ/MM/AAAA"
 * @param {string|Date} dateInput 
 * @returns {string}
 */
export function formatDate(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date)) return '';
  const day = date.getDate().toString().padStart(2,'0');
  const month = (date.getMonth() +1).toString().padStart(2,'0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formate un nombre avec séparateur de milliers
 * @param {number} number 
 * @returns {string}
 */
export function formatNumber(number) {
  if (typeof number !== 'number') return '';
  return number.toLocaleString();
}

/**
 * Formate une note avec 2 décimales
 * @param {number} grade 
 * @returns {string}
 */
export function formatGrade(grade) {
  if (typeof grade !== 'number') return '';
  return grade.toFixed(2);
}
