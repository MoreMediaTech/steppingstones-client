import { useState, useEffect } from 'react'
import { Group, Burger } from '@mantine/core'
import { IoIosSearch } from 'react-icons/io'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { CurrentUser, CountyDataProps, DistrictDataProps } from '@lib/types'
import ContentDrawer from '@components/navigation/ContentDrawer/ContentDrawer'
import Avatar from '@components/Avatar'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { globalSelector, setDrawerOpened } from 'features/global/globalSlice'
import FormInput from '@components/forms/FormComponents/FormInput'

interface IPortalHeaderProps {
  user?: CurrentUser
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
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { drawerOpened } = useAppSelector(globalSelector)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [opened, setOpened] = useState(false)
  const [pos, setPos] = useState<string>('top')
  const initials = user?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  const drawerTitle = drawerOpened ? 'Close navigation' : 'Open navigation'

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
      className={`bg-primary-light-100 py-2 px-4 drop-shadow-md dark:bg-primary-dark-700`}
    >
      <div className="mx-auto py-2 md:px-4">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mb-2 flex items-center gap-4">
            <div className="hidden items-center px-4 py-2 md:flex  ">
              <Burger
                opened={drawerOpened}
                aria-label={drawerTitle}
                onClick={() => dispatch(setDrawerOpened(!drawerOpened))}
                title={drawerTitle}
                color="#00dcb3"
              />
            </div>
            <Group>
              <Avatar
                imageUrl={
                  data ? (data?.logoIcon as string) : (imgUrl as string)
                }
                classes="md:h-10 h-12 md:w-10 w-12"
                imgSize="md:h-10 h-14 md:w-10 w-14"
              />
              <div style={{ flex: 1 }}>
                <h1 className="text-[1rem] font-semibold text-[#00dcb3] sm:text-base">
                  {title}
                </h1>

                <h3 className="text-sm font-semibold text-primary-dark-100 dark:text-primary-light-700">
                  {subTitle}
                </h3>
              </div>
            </Group>
            <div className="m-0 md:hidden list-none px-1 flex ">
              <button
                type="button"
                aria-label="toggle-theme-button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`focus:ring-none ml-4 flex cursor-pointer list-none  p-1 font-medium focus:border-transparent focus:outline-none md:block lg:ml-0 lg:mb-0 lg:p-1 lg:px-1`}
              >
                {resolvedTheme === 'light' ? (
                  <FiSun
                    fontSize={18}
                    className={`${
                      router.asPath === '/' && pos === 'top'
                        ? 'text-primary-dark-100 dark:text-primary-light-100'
                        : 'text-primary-dark-100 dark:text-primary-light-100'
                    } font-bold `}
                  />
                ) : (
                  <FiMoon
                    fontSize={18}
                    className={`${
                      router.asPath === '/' && pos === 'top'
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
                className={`focus:ring-none ml-4 flex cursor-pointer list-none  p-1 font-medium focus:border-transparent focus:outline-none md:block lg:ml-0 lg:mb-0 lg:p-1 lg:px-1`}
              >
                {resolvedTheme === 'light' ? (
                  <FiSun
                    fontSize={18}
                    className={`${
                      router.asPath === '/' && pos === 'top'
                        ? 'text-primary-dark-100 dark:text-primary-light-100'
                        : 'text-primary-dark-100 dark:text-primary-light-100'
                    } font-bold `}
                  />
                ) : (
                  <FiMoon
                    fontSize={18}
                    className={`${
                      router.asPath === '/' && pos === 'top'
                        ? 'text-primary-dark-100 dark:text-primary-light-100'
                        : 'text-primary-dark-100 dark:text-primary-light-100'
                    } font-bold `}
                  />
                )}
                <span hidden>toggle theme</span>
              </button>
            </div>
            <FormInput
              label="Search"
              type="search"
              aria-label="search"
              placeholder="Search"
              appendComponent={<IoIosSearch fontSize={25} fontWeight={500} />}
            />

            {/* <div className={!!data ? 'display: flex' : 'hidden'}>
              {!!data && (
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  title={drawerTitle}
                  size={50}
                  color="#00dcb3"
                />
              )}
            </div> */}
          </div>
        </div>
      </div>
      <ContentDrawer
        opened={opened}
        setOpened={setOpened}
        countyData={data as CountyDataProps}
      />
    </header>
  )
}

export default PortalHeader
