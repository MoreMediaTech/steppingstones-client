import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdBusiness } from 'react-icons/md'
import { FaRegUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/navigation-menu'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'

export function LoginButton({
  pos,
  currentUser,
  handleLogout,
  setActivePath,
}: {
  pos: string
  currentUser: UserSchemaWithIdAndOrganisationType
  handleLogout(): void
  setActivePath: React.Dispatch<React.SetStateAction<string>>
}) {
  const pathname = usePathname()
  return (
    <>
      {currentUser ? (
        <li>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`bg-transparent text-[16px] hover:bg-transparent ${
                    pos === 'top' && pathname === '/' ? 'text-textLight' : ' '
                  }`}
                >
                  {currentUser?.email ?? ''}
                </NavigationMenuTrigger>
                <NavigationMenuContent className=" bg-background ">
                  <ul className="grid w-[220px] gap-3 p-4  ">
                    <li className="w-full rounded p-2 hover:bg-primary-dark-200/50">
                      <NavigationMenuLink
                        className="flex w-full items-center gap-2 px-2"
                        href={'/admin-portal'}
                      >
                        <MdBusiness fontSize={20} />
                        <span className="text-lg">Admin Portal</span>
                      </NavigationMenuLink>
                    </li>
                    <li className="w-full rounded p-2 hover:bg-primary-dark-200/50">
                      <NavigationMenuLink
                        className="flex w-full items-center gap-2 px-2"
                        href={'/auth/user-profile'}
                      >
                        <FaRegUser fontSize={20} />
                        <span className="text-lg">Profile</span>
                      </NavigationMenuLink>
                    </li>
                    <li className="w-full rounded hover:bg-primary-dark-200/50">
                      <NavigationMenuLink className="w-full">
                        <Button
                          type="button"
                          variant="ghost"
                          className="flex w-full items-center justify-start gap-2 hover:bg-transparent"
                          onClick={() => handleLogout()}
                        >
                          <FaSignOutAlt fontSize={20} />
                          <span className="text-lg">Logout</span>
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
      ) : (
        <li
          className={` cursor-pointer font-poppins text-[16px] font-normal ${
            pos === 'top' && pathname === '/' ? 'text-textLight' : ' '
          }`}
        >
          <Link
            href={'/auth/login'}
            className={`flex items-center gap-1 `}
            onClick={() => setActivePath('/auth/login')}
          >
            <FaSignInAlt fontSize={18} />
            <span>Login</span>
          </Link>
        </li>
      )}
    </>
  )
}

export function MobileLoginButton({
  currentUser,
  handleLogout,
  setActivePath,
}: {
  currentUser: UserSchemaWithIdAndOrganisationType
  handleLogout(): void
  setActivePath: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <>
      {currentUser ? (
        <>
          <Separator className="my-2 w-full" />
          <span className="mb-2 text-[16px]">Admin</span>
          <li className="mb-4 w-full cursor-pointer font-montserrat text-[16px] font-medium">
            <Button
              variant="outline"
              asChild
              className="flex items-center justify-start"
            >
              <Link
                className="flex items-center justify-start gap-2"
                href={'/admin-portal'}
              >
                <MdBusiness fontSize={20} />
                <span className="text-lg">Admin Portal</span>
              </Link>
            </Button>
          </li>
          <Separator className="my-2 w-full" />
          <span className="mb-2 text-[16px]">Setting</span>
          <li className="mb-4 w-full cursor-pointer font-montserrat text-[16px] font-medium">
            <Button
              variant="outline"
              asChild
              className="flex items-center justify-start"
            >
              <Link
                href={'/auth/user-profile'}
                className="flex items-center justify-start gap-2 text-lg"
              >
                <FaRegUser fontSize={20} />
                <span className="text-lg">Profile</span>
              </Link>
            </Button>
          </li>
          <li className="mb-4 w-full cursor-pointer font-montserrat text-[16px] font-medium">
            <Button
              variant="outline"
              className="flex w-full items-center justify-start gap-2"
            >
              <FaSignOutAlt fontSize={20} />
              <span className="text-lg ">Logout</span>
            </Button>
          </li>
        </>
      ) : (
        <li className="mb-4 cursor-pointer font-montserrat text-[16px] font-medium ">
          <Button
            variant="outline"
            asChild
            className="flex items-center justify-start"
          >
            <Link
              href={'/auth/login'}
              className="flex items-center gap-1"
              onClick={() => setActivePath('/auth/login')}
            >
              <FaSignInAlt fontSize={20} />
              <span className="text-base">Login</span>
            </Link>
          </Button>
        </li>
      )}
    </>
  )
}
