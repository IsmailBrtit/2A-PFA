import React from 'react';
import clsx from 'clsx';

/**
 * Bouton réutilisable avec variantes (primary, secondary)
 * Props principales : 
 * - variant : 'primary' | 'secondary' (défaut 'primary')
 * - disabled : bool
 * - onClick : fonction
 * - children : contenu du bouton
 */
const Button = ({ variant = 'primary', disabled = false, onClick, children, className }) => {
  const baseClasses = 'py-2 px-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClasses, variants[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
