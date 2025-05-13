'use client'

import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg shadow-sm'

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, ...props }, ref) => {
    const variantStyles = {
      default: '',
      bordered: 'border border-gray-200 dark:border-gray-700'
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    const hoverStyles = hover ? 'hover:shadow-lg transition-shadow duration-200' : ''

    return (
      <div
        ref={ref}
        className={twMerge(
          baseStyles,
          variantStyles[variant],
          paddings[padding],
          hoverStyles,
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card } 