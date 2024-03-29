import React, { forwardRef, HTMLProps, ReactNode } from 'react'

export type Ref = HTMLButtonElement

interface Colors {
    primary: string;
    outline: string;
    success: string;
    danger: string;
    dark: string;
    warning: string;
    indigo: string;
    yellow: string;
    gray: string;
}

type ButtonProps = {
  disabled?: boolean
  className?: string
  color: string
  type: 'submit' | 'button'
  children?: ReactNode
  props?: HTMLProps<HTMLButtonElement>
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = forwardRef<Ref, ButtonProps>(
  (
    { children, disabled, className, type, color, ...props }: ButtonProps,
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={`${colors[color as keyof Colors]} ${className} ${
        disabled ? 'cursor-not-allowed opacity-60' : ''
      }   flex items-center justify-center rounded px-4 py-2 font-medium shadow transition text-xs sm:text-sm  duration-200 ease-in focus:outline-none`}
      {...props}
    >
      {children}
    </button>
  )
)

const colors: Colors = {
  primary: `border-[#ef946c]  border-2 text-gray-100 bg-[#ef946c] active:bg-[#ef946c]  active:text-gray-100 hover:bg-[#f19f7b]   hover:text-gray-100 hover:-translate-y-1 hover:scale-100`,
  outline: `border-gray-900 dark:border-gray-100 border-2 text-gray-900 dark:text-gray-100 active:bg-[#f19f7b] active:text-white hover:bg-[#f19f7b] hover:text-gray-100 hover:-translate-y-1 hover:scale-100 font-medium hover:border-[#f19f7b] dark:hover:border-[#f19f7b]`,
  success: `border-tertiary border-2 text-tertiary active:bg-tertiary active:text-white hover:bg-[#2796b2] hover:text-white hover:-translate-y-1 hover:scale-100`,
  danger: `border-red-600 border text-red-600 active:bg-red-600 active:text-white`,
  dark: `border-black border text-gray-900 active:bg-black active:text-white hover:bg-black hover:text-white`,
  gray: `border-gray-500 border text-gray-500 active:bg-gray-500 active:text-gray-200 hover:bg-gray-500 hover:text-gray-200`,
  warning: `border-red-500 border text-red-500 hover:bg-red-500 hover:text-white`,
  indigo: `border-indigo-900 border-2 text-indigo-900 active:bg-indigo-900 active:text-white`,
  yellow: `border-yellow-500 border text-yellow-500 active:bg-yellow-500 active:text-white text-center hover:bg-yellow-500 hover:text-white`,
}

Button.displayName = 'Button'

export default Button
