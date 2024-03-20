"use client";

import { usePathname } from "next/navigation";

// redux-state and types

import { useAppSelector } from "@app/global-state/hooks";
import { userSelector } from "@app/global-state/features/user/userSlice";

// components
import { AppLogo } from "./AppLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { ModeToggle } from "@components/ModeToggle";

export function AdminNavbar() {
  const pathname = usePathname();
  const { user: currentUser } = useAppSelector(userSelector);

  const initials = currentUser?.name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("");

  return (
    <nav
      className={`fixed top-0 z-40  flex h-20 w-full flex-col bg-background shadow-xl shadow-green-100/50`}
    >
      <div className="flex w-full items-center justify-between px-4 py-4">
        <AppLogo pathname={pathname} />
        {/* Main Navigation */}
        <ul className="hidden list-none items-center justify-end gap-6 md:flex">
          <li className="m-0 flex list-none ">
            <ModeToggle />
          </li>
          <li className="m-0 flex list-none ">
            <Avatar>
              <AvatarImage src={currentUser?.imageUrl} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </li>
        </ul>
      </div>
    </nav>
  );
}
