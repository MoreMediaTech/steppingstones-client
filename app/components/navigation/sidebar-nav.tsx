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
        'flex relative w-full px-2 py-0 md:flex-col md:pt-2 md:pb-8',
        className
      )}
      {...props}
    >
      <div className=' flex w-full space-x-2 md:h-[800px] overflow-y-hidden overflow-x-scroll md:flex-col md:space-x-0 md:space-y-1 md:overflow-x-hidden md:overflow-y-auto '>
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
      </div>
    </nav>
  )
}
