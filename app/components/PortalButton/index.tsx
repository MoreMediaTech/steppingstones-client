import React, { forwardRef, HTMLProps, ReactNode } from 'react'

export type Ref = HTMLButtonElement

interface Colors {
  primaryFilled: string
  primaryOutline: string
  success: string
  danger: string
  dark: string
  warning: string
  indigo: string
  yellow: string
  gray: string
}

type ButtonProps = {
  disabled?: boolean
  className?: string
  isLive?: boolean
  color: string
  type: 'submit' | 'button'
  children?: ReactNode
  props?: React.ComponentProps<'button'>
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PortalButton = forwardRef<Ref, ButtonProps>(
  (
    {
      children,
      disabled,
      isLive,
      className,
      type,
      color,
      ...props
    }: ButtonProps,
    ref
  ) => (
    <div
      className={`${colors[color as keyof Colors]} ${className} ${
        disabled ? 'cursor-not-allowed opacity-60' : ''
      }  relative flex cursor-pointer items-center justify-center rounded text-xs font-medium shadow transition duration-200  ease-in focus:outline-none sm:text-sm`}
    >
      <button
        ref={ref}
        disabled={disabled}
        type={type}
        {...props}
        className="px-4 py-4"
      >
        {children}
      </button>
      <span
        className={`${
          isLive ? 'bg-green-500' : 'bg-red-500'
        } absolute top-1 right-1 z-10 h-2 w-2 rounded-full`}
      ></span>
    </div>
  )
)

const colors: Colors = {
  primaryFilled: `border-primary-dark-200 dark:border-primary-light-200  border-2 text-textLight dark:text-textDark bg-primary-dark-200 dark:bg-primary-light-200 hover:bg-primary-dark-100 dark:hover:bg-primary-light-100  hover:text-textLight dark:hover:text-textDark hover:-translate-y-1 hover:scale-100`,
  primaryOutline: `border-primary border-2 text-primary active:bg-primary active:text-white hover:bg-secondary hover:text-white hover:-translate-y-1 hover:scale-100`,
  success: `border-tertiary border-2 text-tertiary active:bg-tertiary active:text-white hover:bg-accent hover:text-white hover:-translate-y-1 hover:scale-100`,
  danger: `border-red-600 border text-red-600 active:bg-red-600 active:text-white`,
  dark: `border-black border text-gray-900 active:bg-black active:text-white hover:bg-black hover:text-white`,
  gray: `border-gray-500 border text-gray-500 active:bg-gray-500 active:text-gray-200 hover:bg-gray-500 hover:text-gray-200`,
  warning: `border-red-500 border text-red-500 hover:bg-red-500 hover:text-white`,
  indigo: `border-indigo-900 border-2 text-indigo-900 active:bg-indigo-900 active:text-white`,
  yellow: `border-yellow-500 border text-yellow-500 active:bg-yellow-500 active:text-white text-center hover:bg-yellow-500 hover:text-white`,
}

PortalButton.displayName = 'PortalButton'

export default PortalButton
