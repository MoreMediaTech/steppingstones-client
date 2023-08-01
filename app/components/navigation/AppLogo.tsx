
import Link from 'next/link'
import Image from 'next/image'
import ScrollLink from 'app/components/scroll-link'

export const AppLogo = ({
  pos,
  activePath,
  setActivePath,
}: {
  pos: string
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
        <div className=" flex items-center gap-6 md:gap-8">
          <div className="md:w-50 h-50 relative -mb-1 hidden md:flex ">
            <Image
              src={'/SS_Color _logo _with background2.png'}
              alt="Stepping Stones logo"
              height={50}
              width={200}
            />
          </div>
          <div className="md:w-50 h-50 relative -mb-1 flex md:hidden">
            <Image
              src={'/SS-Color-logo-with-background.png'}
              alt="Stepping Stones logo"
              height={40}
              width={40}
            />
          </div>
        
        </div>
      </ScrollLink>
    ) : (
      <Link
        href={'/'}
        className="flex cursor-pointer items-center lg:w-0 lg:flex-1"
        onClick={() => setActivePath!('hero')}
      >
        <div className=" flex items-center gap-2 md:gap-8">
          <div className="md:w-42 h-42 relative -mb-1 hidden md:flex ">
            <Image
              src={'/SS_Color _logo _with background2.png'}
              alt="Stepping Stones logo"
              height={50}
              width={200}
            />
          </div>
          <div className="md:w-42 h-42 relative -mb-1 flex md:hidden">
            <Image
              src={'/SS-Color-logo-with-background.png'}
              alt="Stepping Stones logo"
              height={40}
              width={40}
            />
          </div>
         
        </div>
      </Link>
    )}
  </>
)
