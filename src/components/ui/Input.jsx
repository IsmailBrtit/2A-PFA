import React from 'react';
import clsx from 'clsx';

/**
 * Input personnalisé avec styles Tailwind
 * Props classiques : 
 * - id, name, type, value, onChange, placeholder, disabled, required, etc.
 * - className pour styles additionnels
 */
const Input = React.forwardRef(({ className, ...props }, ref) => {
  const baseClasses = 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors';

  return (
    <input
      ref={ref}
      className={clsx(baseClasses, className)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
