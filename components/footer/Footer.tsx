import Image from 'next/image'
import Link from 'next/link'

import { FaTwitter } from 'react-icons/fa'
import steppinstonesapplogo from '../../public/android-chrome-512x512.png'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bottom-0 left-0 mb-0 w-full border-t border-indigo-100 bg-primary-light-100 py-4 text-gray-900 dark:bg-primary-dark-800 dark:text-primary-light-100">
      <div className="container mx-auto space-y-4">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div>
            <Image
              src={steppinstonesapplogo}
              alt="Stepping Stones app logo"
              width={200}
              height={200}
            />
          </div>
          <div>
            <nav className=" flex flex-col justify-between space-y-4 text-center text-sm  font-medium sm:flex-row sm:space-y-0 sm:space-x-24">
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
        <div className="flex flex-col items-center justify-between gap-4 border-t py-4 text-center sm:h-24 sm:w-full sm:flex-row sm:py-0">
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
