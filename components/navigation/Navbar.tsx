import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Burger, Drawer } from '@mantine/core'

const Navbar = () => {
  const [pos, setPos] = useState<string>('top')
  const [opened, setOpened] = useState<boolean>(false)
  const title = opened ? 'Close navigation' : 'Open navigation'
  useEffect(() => {
    const handleScrollTop = () => {
      const scrolled = document.scrollingElement?.scrollTop ?? 5
      if (scrolled >= 5) {
        setPos('moved')
      } else {
        setPos('top')
      }
    }
    document.addEventListener('scroll', handleScrollTop)
    return () => document.removeEventListener('scroll', handleScrollTop)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.location.hash = ''
  }
  return (
    <header
      className={`${
        pos === 'top' ? 'absolute bg-white ' : 'shadow-b-2xl fixed bg-white '
      } top-0 z-10 flex w-full flex-wrap items-center justify-between shadow-sm`}
    >
      <div className="mx-auto w-full max-w-screen-xl p-2">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div
            className="flex cursor-pointer items-center gap-2 lg:w-0 lg:flex-1"
            onClick={scrollToTop}
          >
            <div className="w-50 h-50 -mb-4">
              <Image src={'/SteppingStonesLogo2.png'} width={80} height={80} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold uppercase text-indigo-900 sm:text-2xl">
                Stepping Stones
              </h1>
              <h3 className="text-xs capitalize text-sky-500">
                Business resource solutions
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <nav className="hidden space-x-8 text-sm font-medium md:flex">
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

            <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
              <a
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
                href="#"
              >
                Enquire
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              title={title}
            />

            <Drawer
              opened={opened}
              onClose={() => setOpened(false)}
              padding="xl"
              size="lg"
              position="right"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex cursor-pointer items-center gap-2 lg:w-0 lg:flex-1"
                  onClick={scrollToTop}
                >
                  <div className="w-50 h-50 -mb-4">
                    <Image
                      src={'/SteppingStonesLogo2.png'}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl font-semibold uppercase text-indigo-900 sm:text-2xl">
                      Stepping Stones
                    </h1>
                    <h3 className="text-xs capitalize text-sky-500">
                      Business resource solutions
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 space-y-8 p-8">
                <nav className="flex flex-col space-y-8 text-sm font-medium ">
                  <a
                    className="text-2xl font-semibold text-gray-900"
                    href="#about"
                  >
                    About
                  </a>
                  <a
                    className="text-2xl font-semibold text-gray-900"
                    href="#features"
                  >
                    Features
                  </a>
                  <a
                    className="text-2xl font-semibold text-gray-900"
                    href="#faqs"
                  >
                    FAQs
                  </a>
                </nav>

                <div className="flex-1 items-center justify-end space-x-4 md:flex">
                  <a
                    className="rounded-lg bg-blue-600 px-5 py-2 text-lg font-medium text-white"
                    href="#"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
