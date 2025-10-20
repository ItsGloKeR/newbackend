import React from 'react';

// FIX: Added 'size' prop to support different button sizes, and refactored classes.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
  size?: 'sm' | 'md';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  isLoading = false,
  size = 'md',
  ...props
}) => {
  const baseClasses = 'rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-indigo-500 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-purple-600 focus:ring-secondary',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary focus:ring-primary',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;