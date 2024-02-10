"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

// redux-state and types
import { useGetUserQuery } from "@global-state/features/user/usersApiSlice";
import { UserSchemaWithIdType } from "@models/User";
import { useAppSelector } from "@app/global-state/hooks";
import { authSelector } from "@app/global-state/features/auth/authSlice";

// components
import { AppLogo } from "./AppLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import Banner from "@components/Banner";
import { ModeToggle } from "@components/ModeToggle";

export function AdminNavbar() {
  const pathname = usePathname();

  const { isAuthenticated } = useAppSelector(authSelector);
  const { data: currentUser } = useGetUserQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [pos, setPos] = useState<string>("top");

  const initials = currentUser?.name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("");

  useEffect(() => {
    const handleScrollTop = () => {
      const scrolled = document.scrollingElement?.scrollTop ?? 5;
      if (scrolled >= 5) {
        setPos("moved");
      } else {
        setPos("top");
      }
    };
    document.addEventListener("scroll", handleScrollTop);
    return () => document.removeEventListener("scroll", handleScrollTop);
  }, []);

  return (
    <nav
      className={`top-0 z-40 flex  h-20 w-full flex-col bg-background shadow-xl shadow-green-100/50 fixed`}
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
