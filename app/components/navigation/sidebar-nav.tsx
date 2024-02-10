"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";

import { cn } from "@lib/utils";
import { Button, buttonVariants } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  title: string;
  height: number;
}

export function SidebarNav({
  className,
  items,
  title,
  height,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const SCROLL_AREA_HEIGHT = height - 80;
  return (
    <nav
      className={cn(
        ` fixed z-0 flex px-2  py-0 bg-background w-[250px]  md:flex-col`,
        className,
      )}
      {...props}
    >
      <div className="hidden md:block w-full">
        <ScrollArea
          className={`hidden rounded-md border p-4 sm:flex w-full sm:flex-col`}
          style={{ height: SCROLL_AREA_HEIGHT }}
        >
          <h4 className="mb-4 text-sm font-medium leading-none">{title}</h4>
          {items?.map((item, index) => (
            <div key={`${item.href}-${index}`}>
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  item.href.includes(pathname)
                    ? "bg-gray-300 text-justify dark:bg-gray-800 "
                    : "hover:bg-gray-300 hover:underline dark:hover:bg-gray-800",
                  "w-full justify-start subpixel-antialiased",
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
  );
}

export function MobileSideNav({
  className,
  items,
  title,
  height,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const SCROLL_AREA_HEIGHT = height - 200;
  return (
    <nav className="max-h-[900px]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <svg
              className="block h-6 w-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
            <span hidden>Mobile Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="text-left">{title}</SheetTitle>
          </SheetHeader>
          <ScrollArea
            className={`flex h-[700px] flex-col rounded-md border  p-4`}
            style={{ height: SCROLL_AREA_HEIGHT }}
          >
            {items?.map((item, index) => (
              <div key={`${item.href}-${index}`}>
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    item.href.includes(pathname)
                      ? "bg-gray-300 text-justify dark:bg-gray-800 "
                      : "hover:bg-gray-300 hover:underline dark:hover:bg-gray-800",
                    "w-full justify-start subpixel-antialiased",
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
  );
}
