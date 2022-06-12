import Link from 'next/link'
import { MdOutlineSpeakerNotes, MdOutlineReviews } from 'react-icons/md'
import { FaMoneyBillWave, FaRegCalendarAlt, FaChartBar } from 'react-icons/fa'

const PortalSection = () => {
  return (
    <section className="relative mx-auto flex flex-grow items-center justify-center md:container md:p-8">
      <div className="grid w-full grid-cols-1 gap-12 px-2 py-4 md:grid-cols-3 md:p-8 ">
        <div>
          <Link href={'#'}>
            <a className="flex h-48 flex-col items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl font-semibold text-white drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#0c6980] md:h-56 md:w-72">
              <span>
                <MdOutlineSpeakerNotes fontSize={44} />
              </span>
              Advertisements
            </a>
          </Link>
        </div>
        <div>
          <Link href={'/admin/editor-portal/counties'}>
            <a className="flex flex-col h-48 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl font-semibold text-white drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#0c6980] md:h-56 md:w-72">
              County Portal
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex flex-col h-48 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl font-semibold text-white drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#0c6980] md:h-56 md:w-72">
              <span>
                <FaMoneyBillWave fontSize={44} />
              </span>
              Revenues
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex flex-col h-48 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl font-semibold text-white drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#0c6980] md:h-56 md:w-72">
              <span><FaRegCalendarAlt fontSize={44} /></span>
              Client Meetings
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex flex-col h-48 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl font-semibold text-white drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#0c6980] md:h-56 md:w-72">
              <span><FaChartBar fontSize={44} /></span>
              Insights
            </a>
          </Link>
        </div>
        <div>
          <Link href={'#'}>
            <a className="flex flex-col h-48 items-center justify-center rounded-lg bg-[#5271ff] py-8 px-4 text-2xl font-semibold text-white drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#0c6980] md:h-56 md:w-72">
              <span><MdOutlineReviews fontSize={44} /></span>
              Feedback
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PortalSection
