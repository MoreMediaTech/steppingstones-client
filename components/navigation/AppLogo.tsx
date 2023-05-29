import { Group } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import ScrollLink from '@components/scroll-link'

export const AppLogo = ({
  activePath,
  setActivePath,
}: {
  activePath?: string
  setActivePath?: React.Dispatch<React.SetStateAction<string>>
}) => (
  <>
    {activePath === 'hero' ? (
      <ScrollLink
        href={`${activePath === 'hero' ? '/#hero' : '/'}`}
        className="flex cursor-pointer items-center lg:w-0 lg:flex-1"
        onClick={() => setActivePath!('hero')}
      >
        <Group className=" flex items-center gap-6 md:gap-8">
          <div className="md:w-50 h-50 relative -mb-1 flex ">
            <Image
              src={'/steppingstonesapplogo.png'}
              alt="Stepping Stones logo"
              height={50}
              width={50}
            />
          </div>
          <div className="-ml-6 flex flex-col">
            <h1 className="font-poppins text-lg font-bold capitalize text-[#5E17EB] md:text-lg">
              SteppingStones
            </h1>
            <h3 className="font-poppins text-xs capitalize text-[#00DCB3]">
              Solutions for Businesses
            </h3>
          </div>
        </Group>
      </ScrollLink>
    ) : (
      <Link
        href={'/'}
        className="flex cursor-pointer items-center lg:w-0 lg:flex-1"
        onClick={() => setActivePath!('hero')}
      >
        <Group className=" flex items-center gap-6 md:gap-8">
          <div className="md:w-50 h-50 relative -mb-1 flex ">
            <Image
              src={'/steppingstonesapplogo.png'}
              alt="Stepping Stones logo"
              height={50}
              width={50}
            />
          </div>
          <div className="-ml-6 flex flex-col">
            <h1 className="font-poppins text-lg font-bold capitalize text-[#5E17EB] md:text-lg">
              SteppingStones
            </h1>
            <h3 className="font-poppins text-xs capitalize text-[#00DCB3]">
              Solutions for Businesses
            </h3>
          </div>
        </Group>
      </Link>
    )}
  </>
)
