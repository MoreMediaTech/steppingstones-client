import Link from 'next/link'
import Image from 'next/image'

export const AppLogo = ({ pathname }: { pathname: string }) => (
  <>
    <Link
      href={pathname === '/' ? `/#hero` : '/'}
      className="flex cursor-pointer items-center lg:w-0 lg:flex-1"
      scroll
      as={pathname === '/' ? `/#hero` : '/'}
    >
      <div className=" flex items-center gap-6 md:gap-8">
        <div className="relative -mb-1 hidden h-auto w-auto md:flex ">
          <Image
            src={'/SS_Color_logo_with-background2.png'}
            alt="Stepping Stones logo"
            height={50}
            width={200}
            sizes="(min-width: 640px) 100px, 50px"
            quality={100}
          />
        </div>
        <div className="relative -mb-1 flex h-auto w-auto md:hidden">
          <Image
            src={'/SS_Color_logo_with-background2.png'}
            alt="Stepping Stones logo"
            height={50}
            sizes="(min-width: 640px) 100px, 50px"
            width={180}
            quality={100}
          />
        </div>
      </div>
    </Link>
  </>
)
