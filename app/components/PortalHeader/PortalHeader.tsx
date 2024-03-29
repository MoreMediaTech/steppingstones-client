'use client'
import { useState, useEffect } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { CountyDataProps, DistrictDataProps } from '@lib/types'
import Avatar from 'app/components/Avatar'

import { UserSchemaWithIdType } from '@models/User'

interface IPortalHeaderProps {
  user?: UserSchemaWithIdType
  title?: string
  subTitle?: string
  imgUrl?: string
  data?: CountyDataProps | DistrictDataProps
}

const PortalHeader = ({
  user,
  title,
  subTitle,
  data,
  imgUrl,
}: IPortalHeaderProps) => {
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
 
  const [pos, setPos] = useState<string>('top')
  const initials = user?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  // Check the top position of the navigation in the window
  useEffect(() => {
    const handleScrollTop = () => {
      const scrolled = document?.scrollingElement?.scrollTop as number

      if (scrolled >= 2) {
        setPos('moved')
      } else {
        setPos('top')
      }
    }
    document.addEventListener('scroll', handleScrollTop)
    return () => document.removeEventListener('scroll', handleScrollTop)
  }, [])

  return (
    <header
      className={` bg-background px-4 py-2 drop-shadow-md  w-full`}
    >
      <div className="mx-auto py-2 md:px-4">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mb-2 flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
             
              <div>
                <Avatar
                  imageUrl={
                    data ? (data?.logoIcon as string) : (imgUrl as string)
                  }
                  classes="md:h-10 h-12 md:w-10 w-12"
                  imgSize="md:h-10 h-14 md:w-10 w-14"
                />
                <div style={{ flex: 1 }}>
                  <h1 className="text-xs sm:text-[1rem] font-semibold text-textDark dark:text-textLight sm:text-base">
                    {title}
                  </h1>

                  <h3 className="text-xs sm:text-sm font-semibold text-accent-dark-100 dark:text-accent-light-200">
                    {subTitle}
                  </h3>
                </div>
              </div>
            </div>
            <div className="m-0 flex list-none px-1 md:hidden ">
              <button
                type="button"
                aria-label="toggle-theme-button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`focus:ring-none ml-4 flex cursor-pointer list-none  p-1 font-medium focus:border-transparent focus:outline-none md:block lg:mb-0 lg:ml-0 lg:p-1 lg:px-1`}
              >
                {resolvedTheme === 'light' ? (
                  <FiSun
                    fontSize={18}
                    className={`${
                      pathname === '/' && pos === 'top'
                        ? 'text-primary-dark-100 dark:text-primary-light-100'
                        : 'text-primary-dark-100 dark:text-primary-light-100'
                    } font-bold `}
                  />
                ) : (
                  <FiMoon
                    fontSize={18}
                    className={`${
                      pathname === '/' && pos === 'top'
                        ? 'text-primary-dark-100 dark:text-primary-light-100'
                        : 'text-primary-dark-100 dark:text-primary-light-100'
                    } font-bold `}
                  />
                )}
                <span hidden>toggle theme</span>
              </button>
            </div>
          </div>
          <div className="flex w-full items-center md:w-96 md:space-x-4">
            <div className="m-0 hidden list-none px-1 md:flex ">
              <button
                type="button"
                aria-label="toggle-theme-button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`focus:ring-none ml-4 flex cursor-pointer list-none  p-1 font-medium focus:border-transparent focus:outline-none md:block lg:mb-0 lg:ml-0 lg:p-1 lg:px-1`}
              >
                {resolvedTheme === 'light' ? (
                  <FiSun
                    fontSize={18}
                    className={`${
                      pathname === '/' && pos === 'top'
                        ? 'text-primary-dark-100 dark:text-primary-light-100'
                        : 'text-primary-dark-100 dark:text-primary-light-100'
                    } font-bold `}
                  />
                ) : (
                  <FiMoon
                    fontSize={18}
                    className={`${
                      pathname === '/' && pos === 'top'
                        ? 'text-primary-dark-100 dark:text-primary-light-100'
                        : 'text-primary-dark-100 dark:text-primary-light-100'
                    } font-bold `}
                  />
                )}
                <span hidden>toggle theme</span>
              </button>
            </div>
            {/* <FormInput
              label="Search"
              type="search"
              aria-label="search"
              placeholder="Search"
              appendComponent={<IoIosSearch fontSize={25} fontWeight={500} />}
              hidden
            /> */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default PortalHeader
