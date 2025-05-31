import React from 'react';

/**
 * Composant carte UI simple
 * Props : 
 * - className : classes additionnelles
 * - children : contenu
 */
const Card = ({ className = '', children }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
