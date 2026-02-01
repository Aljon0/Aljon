import React from 'react';

interface CardProps {
  isDark: boolean;
  className?: string;
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ isDark, className = "", title, action, children }) => {
  return (
    <div
      className={`
        rounded-2xl p-6 transition-colors duration-300 border
        ${isDark 
          ? 'bg-neutral-900 border-neutral-800 text-neutral-100' 
          : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'} 
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-semibold text-lg tracking-tight">{title}</h3>}
          {action && <div className={`${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};