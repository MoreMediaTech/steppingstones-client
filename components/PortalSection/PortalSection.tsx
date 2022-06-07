import Link from 'next/link'

const PortalSection = () => {
  return (
    <section className="relative mx-auto flex flex-grow items-center justify-center md:p-8 md:container">
      <div className="grid grid-cols-1 gap-12 md:p-8 md:grid-cols-3 w-full px-2 py-4 ">
        <div>
          <Link href={'#'}>
            <a className="flex h-48 text-white font-semibold md:w-56 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl">
              Advertisements
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex h-48 text-white font-semibold md:w-56 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl">
              County Portal
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex h-48 text-white font-semibold md:w-56 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl">
              Revenues
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex h-48 text-white font-semibold md:w-56 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl">
              Client Meetings
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex h-48 text-white font-semibold md:w-56 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl">
              Insights
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex h-48 text-white font-semibold md:w-56 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl">
              Feedback
            </a>
          </Link>
        </div>
        
      </div>
    </section>
  )
}

export default PortalSection
