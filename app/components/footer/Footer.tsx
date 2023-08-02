import Image from 'next/image'
import Link from 'next/link'

import { FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bottom-0 left-0 mb-0 w-full border-t-2 border-slate-300 py-6  dark:text-textLight">
      <div className="container mx-auto space-y-2 py-4 md:space-y-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className=" flex items-center gap-6 md:gap-8">
            <div className=" relative -mb-1 hidden md:flex ">
              <Image
                src={'/SS_Color _logo _with background2.png'}
                alt="Stepping Stones logo"
                height={50}
                width={200}
                priority
              />
            </div>
            <div className=" relative -mb-1 flex md:hidden">
              <Image
                src={'/SS-Color-logo-with-background.png'}
                alt="Stepping Stones logo"
                height={70}
                width={70}
                priority
              />
            </div>
          </div>
          <div>
            <nav className=" flex flex-col justify-between space-y-4 text-center text-sm  font-medium sm:flex-row sm:space-x-24 sm:space-y-0">
              <a className="font-semibold " href="#about">
                About
              </a>
              <a className="font-semibold " href="#features">
                Features
              </a>
              <a className="font-semibold " href="#faqs">
                FAQs
              </a>
            </nav>
          </div>
          <div className="rounded-xl bg-blue-400 px-2 py-1 shadow-sm md:mr-4">
            <a href="#" className="flex items-center gap-2">
              <FaTwitter fontSize={18} color="#fff" />
              <span className="text-white">tweet</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between py-2 text-center sm:w-full  md:flex-row md:gap-4">
          <div>
            <p className="text-xs sm:text-sm">
              Stepping Stones App<sup>&copy;</sup> is the copyright and product
              of <span>Equilibrium Startup Lab LLC</span> {year}{' '}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 sm:gap-3">
            <Link
              className="cursor-pointer text-xs underline sm:text-sm"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className="cursor-pointer text-xs underline sm:text-sm"
              href="/cookie-policy"
            >
              Cookie Policy
            </Link>
            <Link
              className="cursor-pointer text-xs underline sm:text-sm"
              href="/site-disclaimer"
            >
              Site Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
