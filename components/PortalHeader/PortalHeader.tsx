import { useState, useEffect } from 'react'
import { Avatar, Burger, Group, Text, TextInput } from '@mantine/core'
import { IoIosSearch } from 'react-icons/io'
import { CurrentUser, CountyDataProps, DistrictDataProps } from '@lib/types'
import ContentDrawer from '@components/navigation/ContentDrawer/ContentDrawer'
import Image from 'next/image'
import steppingstonesapplogo from '../../public/steppingstonesapplogo.png'

interface IPortalHeaderProps {
  user?: CurrentUser
  title?: string
  subTitle?: string
  data?: CountyDataProps | DistrictDataProps
}

const PortalHeader = ({ user, title, subTitle, data }: IPortalHeaderProps) => {
  const [opened, setOpened] = useState(false)
  const [pos, setPos] = useState<string>('top')
  const initials = user?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  const drawerTitle = opened ? 'Close Content nav' : 'Open Content navigation'

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
    <header className={`h-70 px-2 py-2 md:px-4 `}>
      <div className="container  mx-auto py-2 md:px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-2">
            <Group>
              <div
                className={` relative flex h-16 w-20 items-center justify-center rounded-md border border-[#3A0B99] bg-[#3A0B99] text-xl font-semibold text-white md:h-20 md:w-24`}
              >
                {user ? (
                  initials
                ) : (
                  <Image
                    src={data ? data?.logoIcon : steppingstonesapplogo}
                    alt={
                      data ? 'County or District logo' : 'Stepping Stones Logo'
                    }
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <h1 className="font-mono text-lg font-semibold text-[#00dcb3] sm:text-[1.2rem] md:text-[1.6rem]">
                  {user ? ` Welcome back ${user?.name?.split(' ')[0]}` : title}
                </h1>

                <h3 className="font-mono text-sm font-semibold text-[#3A0B99] md:text-base">
                  {user ? 'Please select from the menu below' : subTitle}
                </h3>
              </div>
            </Group>
          </div>
          <div className="flex w-full items-center space-x-4 md:w-96">
            <TextInput
              aria-label="search-input"
              placeholder="Search"
              icon={<IoIosSearch fontSize={30} fontWeight={500} />}
              size="lg"
              radius="md"
              className="w-full rounded-xl  bg-transparent shadow-xl"
            />
            <div className={!!data ? 'display: flex' : 'hidden'}>
              {!!data && (
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  title={drawerTitle}
                  size={50}
                  color="#00dcb3"
                />
              )}
            </div>
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
