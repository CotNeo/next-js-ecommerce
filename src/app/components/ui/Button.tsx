'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Spinner } from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  isActive?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    isActive = false,
    className,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-body transform hover:scale-105 active:scale-95'
    
    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 focus:ring-blue-500 dark:focus:ring-offset-neutral-800',
      secondary: 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-400/25 focus:ring-blue-400 dark:focus:ring-offset-neutral-800',
      outline: 'border-2 border-blue-600 hover:bg-blue-50 text-blue-600 focus:ring-blue-500 dark:border-blue-400 dark:hover:bg-blue-900/20 dark:text-blue-400 dark:focus:ring-offset-neutral-800',
      ghost: 'hover:bg-blue-50 text-blue-600 focus:ring-blue-500 dark:hover:bg-blue-900/20 dark:text-blue-400 dark:focus:ring-offset-neutral-800',
      danger: 'bg-gradient-to-r from-error-600 to-error-700 hover:from-error-700 hover:to-error-800 text-white shadow-lg shadow-error-500/25 focus:ring-error-500 dark:focus:ring-offset-neutral-800',
      success: 'bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white shadow-lg shadow-success-500/25 focus:ring-success-500 dark:focus:ring-offset-neutral-800'
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          isActive && 'ring-2 ring-offset-2',
          className
        )}
        {...props}
      >
        {isLoading && (
          <Spinner className="mr-2 h-4 w-4" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button' 