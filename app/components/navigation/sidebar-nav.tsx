'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@lib/utils'
import { buttonVariants } from '@components/ui/button'

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'flex w-full scroll-m-0 space-x-2 overflow-x-scroll py-0 md:py-4 px-2 md:flex-col md:space-x-0 md:space-y-1 md:overflow-x-hidden ',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            item.href.includes(pathname)
              ? 'bg-gray-300 text-justify dark:bg-gray-800 '
              : 'hover:bg-gray-300 hover:underline dark:hover:bg-gray-800',
            'w-full justify-start subpixel-antialiased'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
