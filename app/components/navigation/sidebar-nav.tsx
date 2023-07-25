'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'

import { cn } from '@lib/utils'
import { Button, buttonVariants } from '@components/ui/button'
import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
  title: string
  height: number
}

export function SidebarNav({
  className,
  items,
  title,
  height,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname()
  const SCROLL_AREA_HEIGHT = height - 300
  console.log("🚀 ~ file: sidebar-nav.tsx:40 ~ SCROLL_AREA_HEIGHT:", SCROLL_AREA_HEIGHT)
  return (
    <nav
      className={cn(
        'relative flex w-full px-2 py-0 md:flex-col md:pb-8 md:pt-2',
        className
      )}
      {...props}
    >
      <div className="hidden md:block">
        <ScrollArea
          className={`hidden rounded-md border p-4 sm:flex sm:h-[${SCROLL_AREA_HEIGHT}px]  sm:flex-col`}
        >
          <h4 className="mb-4 text-sm font-medium leading-none">{title}</h4>
          {items.map((item, index) => (
            <div key={`${item.href}-${index}`}>
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
              <Separator className="my-2" />
            </div>
          ))}
        </ScrollArea>
      </div>
    </nav>
  )
}

export function MobileSideNav({
  className,
  items,
  title,
  height,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname()
    const SCROLL_AREA_HEIGHT = height - 300
  return (
    <nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle className="text-left">{title}</SheetTitle>
          </SheetHeader>
          <ScrollArea
            className={`flex h-[${SCROLL_AREA_HEIGHT}px] flex-col rounded-md border  p-4`}
          >
            {items.map((item, index) => (
              <div key={`${item.href}-${index}`}>
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
                <Separator className="my-2" />
              </div>
            ))}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
