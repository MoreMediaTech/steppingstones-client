import Link from 'next/link'
import { MdOutlineSpeakerNotes, MdOutlineReviews } from 'react-icons/md'
import { FaMoneyBillWave, FaRegCalendarAlt, FaChartBar } from 'react-icons/fa'
import { GiPortal } from 'react-icons/gi'

interface ILinks {
  title: string
  path: string
  icon: React.ReactNode
}
const links: ILinks[] = [
  {
    title: 'Advertisements',
    path: 'advertisements',
    icon: <MdOutlineSpeakerNotes fontSize={44} />,
  },
  {
    title: 'County Portal',
    path: 'county-portal',
    icon: <GiPortal fontSize={44} />,
  },
  {
    title: 'Revenues',
    path: 'revenues',
    icon: <FaMoneyBillWave fontSize={44} />,
  },
  {
    title: 'Client Meetings',
    path: 'client-meetings',
    icon: <FaRegCalendarAlt fontSize={44} />,
  },
  { title: 'Insight', path: 'insight', icon: <FaChartBar fontSize={44} /> },
  {
    title: 'Feedback',
    path: 'feedback',
    icon: <MdOutlineReviews fontSize={44} />,
  },
]

const PortalSection = () => {
  return (
    <section className="relative mx-auto  overflow-auto md:container md:p-8">
      <div className="grid w-full grid-cols-1 gap-4 overflow-auto  py-4 md:grid-cols-3 md:gap-12 ">
        {links.map((link, index) => (
          <div key={`${link}-${index}`}>
            <Link href={`/admin/editor-portal/${link.path}`}>
              <a
                className="mx-4 flex h-40 flex-col items-center justify-center rounded-lg bg-[#5271ff] text-lg font-semibold text-white shadow-xl transition delay-150 duration-300 
              ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#0c6980] md:mx-0 md:w-48 md:py-8 md:px-4 md:text-xl lg:h-56 lg:w-72 lg:text-2xl"
              >
                <span>{link.icon}</span>
                {link.title}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PortalSection
