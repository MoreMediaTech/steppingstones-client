import Image from 'next/image';

import { FaTwitter } from 'react-icons/fa'

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <footer className="bottom-0 left-0 mb-0 w-full py-4 border-t border-indigo-100">
      <div className="container mx-auto space-y-4">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div>
            <Image src={'/SteppingStonesLogo3.png'} width={200} height={200} />
          </div>
          <div>
            <nav className=" flex flex-col justify-between space-y-4 text-center text-sm  font-medium sm:flex-row sm:space-y-0 sm:space-x-24">
              <a className="font-semibold text-gray-900" href="#about">
                About
              </a>
              <a className="font-semibold text-gray-900" href="#features">
                Features
              </a>
              <a className="font-semibold text-gray-900" href="#faqs">
                FAQs
              </a>
            </nav>
          </div>
          <div className="rounded-xl bg-blue-400 px-2 py-1 shadow-sm">
            <a href="#" className="flex items-center gap-2">
              <FaTwitter fontSize={18} color="#fff" />
              <span className="text-white">tweet</span>
            </a>
          </div>
        </div>
        <div className="flex h-24 w-full items-center justify-center border-t text-center">
          <p className="text-xs sm:text-sm">
            Stepping Stones App<sup>&copy;</sup> is the copyright and product of{' '}
            <span>More Media International</span> {year}{' '}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer