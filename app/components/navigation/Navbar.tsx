"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";

// redux-state and types
import { UserSchemaWithIdType } from "@models/User";
import { useAppSelector } from "@app/global-state/hooks";
import { authSelector } from "@app/global-state/features/auth/authSlice";
import { userSelector } from "@app/global-state/features/user/userSlice";

// components
import { AppLogo } from "./AppLogo";
import { LoginButton, MobileLoginButton } from "./LoginButton";
import { Button } from "@components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import Banner from "@components/Banner";
import { ModeToggle } from "@components/ModeToggle";

const paths = ["features", "faqs"];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user: currentUser, isAuthenticated } = useAppSelector(userSelector);

  const [pos, setPos] = useState<string>("top");
  const [activePath, setActivePath] = useState<string>("");

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

  const handleLogout = useCallback(async () => {
    router.push("/auth/logout");
  }, []);

  return (
    <nav
      className={`top-0 z-30  flex w-full flex-col ${
        pos === "top"
          ? "absolute bg-transparent shadow-md hover:bg-background/50"
          : "shadow-b-2xl fixed border-b border-primary-dark-100 bg-background dark:border-primary-light-100"
      }`}
    >
      <Banner />
      <div className="container mx-auto flex w-full items-center justify-between py-4 sm:max-w-screen-xl">
        <AppLogo pathname={pathname} />
        {/* Main Navigation */}
        <ul className="hidden list-none items-center justify-end gap-6 md:flex">
          <li className="hidden flex-1 items-center md:flex ">
            {/* <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`cursor-pointer bg-transparent font-poppins text-[16px] font-normal capitalize ${
                      pos === 'top' && pathname === '/' ? 'text-textLight' : ' '
                    }`}
                  >
                    <span>About</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" bg-background ">
                    <ul className="grid w-[220px] gap-3 p-4  ">
                      <li className="w-full rounded p-2 hover:bg-primary-dark-200/50">
                        <NavigationMenuLink
                          className="flex w-full items-center gap-2 px-2"
                          href={'/about'}
                        >
                          <span className="text-sm">About Stepping Stones</span>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu> */}
            <Link
              href={"/about"}
              className={`cursor-pointer font-poppins text-[16px] font-normal capitalize ${
                pos === "top" && pathname === "/" ? "text-textLight" : " "
              }`}
              scroll
            >
              <span
                className={`${
                  activePath === "about"
                    ? "w-full border-b-2 border-primary-dark-100 pb-1 dark:border-primary-light-100"
                    : "border-0"
                }`}
              >
                About
              </span>
            </Link>
          </li>
          {paths.map((path, index) => {
            return (
              <li key={`${path}-${index}`}>
                <Link
                  href={pathname === "/" ? `/#${path}` : "/"}
                  className={`cursor-pointer font-poppins text-[16px] font-normal capitalize ${
                    pos === "top" && pathname === "/" ? "text-textLight" : " "
                  }`}
                  scroll
                >
                  <span
                    className={`${
                      activePath === path
                        ? "w-full border-b-2 border-primary-dark-100 pb-1 dark:border-primary-light-100"
                        : "border-0"
                    }`}
                  >
                    {path}
                  </span>
                </Link>
              </li>
            );
          })}

          <LoginButton
            pos={pos}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser as UserSchemaWithIdType}
            handleLogout={handleLogout}
            setActivePath={setActivePath}
          />
          <li className="m-0 flex list-none ">
            <ModeToggle />
          </li>
          <li className="hidden flex-1 items-center md:flex ">
            <Button variant="outline" asChild>
              <Link
                href={"/enquire"}
                className={`rounded-lg  px-4 py-1 text-lg font-medium  ${
                  pos === "top" && pathname === "/"
                    ? "border-primary-light-100 text-textLight "
                    : " border-primary-dark-100 dark:border-primary-light-100 "
                }`}
                onClick={() => setActivePath("enquire")}
              >
                <span>Enquire</span>
              </Link>
            </Button>
          </li>
        </ul>

        {/* Mobile Navigation */}

        <div className="flex w-full flex-1 items-center justify-end md:hidden">
          <div className="flex items-center gap-2">
            <ModeToggle />
            {currentUser ? (
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ) : null}
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger>
                <GiHamburgerMenu
                  fontSize={24}
                  className={`${
                    pos === "top" && pathname === "/" ? "text-textLight" : " "
                  }`}
                />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <ul className="grid w-full list-none grid-cols-1 gap-2 py-8">
                  {paths.map((path, index) => {
                    return (
                      <li className="w-full " key={`${path}-${index}`}>
                        <SheetTrigger>
                          <Button
                            variant="outline"
                            asChild
                            className="flex items-center justify-start"
                          >
                            <Link
                              href={`/#${path}`}
                              className={`cursor-pointer font-poppins text-[16px] font-normal capitalize `}
                              scroll
                            >
                              <span
                                className={`text-lg ${
                                  activePath === path
                                    ? " w-full border-b-2 border-primary-dark-100 pb-1 dark:border-primary-light-100"
                                    : "border-0"
                                }`}
                              >
                                {path}
                              </span>
                            </Link>
                          </Button>
                        </SheetTrigger>
                      </li>
                    );
                  })}
                  <li className="my-2 w-full cursor-pointer font-poppins font-medium">
                    <SheetTrigger>
                      <Button
                        variant="outline"
                        asChild
                        className="flex items-center justify-start"
                      >
                        <Link
                          href={"/enquire"}
                          className="w-full font-medium "
                          onClick={() => {
                            setActivePath("enquire");
                          }}
                        >
                          <span
                            className={`text-lg ${
                              pathname === "/enquire"
                                ? "w-full border-b-2 border-primary-light-100"
                                : "border-0"
                            }`}
                          >
                            Enquire
                          </span>
                        </Link>
                      </Button>
                    </SheetTrigger>
                  </li>
                  <li className="my-2 w-full cursor-pointer font-poppins font-medium">
                    <SheetTrigger>
                      <MobileLoginButton
                        isAuthenticated={isAuthenticated}
                        currentUser={currentUser as UserSchemaWithIdType}
                        handleLogout={handleLogout}
                        setActivePath={setActivePath}
                      />
                    </SheetTrigger>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Menu */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
