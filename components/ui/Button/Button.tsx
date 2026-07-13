import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClassName = `${styles.button} ${styles[`button-${variant}`]} ${className}`;
  
  return (
    <button className={baseClassName.trim()} {...props}>
      {children}
    </button>
  );
}
