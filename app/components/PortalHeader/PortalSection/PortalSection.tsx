import Link from 'next/link'
import { MdOutlineSpeakerNotes, MdOutlineReviews } from 'react-icons/md'
import { FaRegCalendarAlt, FaChartBar } from 'react-icons/fa'
import { GiPortal } from 'react-icons/gi'

interface ILinks {
  title: string
  path: string
  icon: React.ReactNode
}
const links: ILinks[] = [
  {
    title: 'Advertisements',
    path: 'ads-section',
    icon: <MdOutlineSpeakerNotes fontSize={44} />,
  },
  {
    title: 'County Portal',
    path: 'county-portal',
    icon: <GiPortal fontSize={44} />,
  },
  {
    title: 'Client Meetings',
    path: 'client-meeting',
    icon: <FaRegCalendarAlt fontSize={44} />,
  },
  { title: 'Insights', path: 'insight', icon: <FaChartBar fontSize={44} /> },
  {
    title: 'Feedback',
    path: 'feedback',
    icon: <MdOutlineReviews fontSize={44} />,
  },
]

const PortalSection = () => {
  return (
    <section className="relative mx-auto w-full max-w-screen-xl overflow-auto md:px-20 md:py-8">
      <div className="grid w-full grid-cols-1 gap-4 overflow-auto  py-4 lg:grid-cols-3 md:gap-8 ">
        {links.map((link, index) => (
          <div key={`${link}-${index}`}>
            <Link
              href={`/admin-portal/${link.path}`}
              as={`/admin-portal/${link.path}`}
              className="s mx-4 flex h-40 flex-col items-center justify-center rounded-xl bg-[#ef946c] text-lg font-semibold text-white shadow-lg transition duration-300 
              delay-150 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#f19f7b]   md:mx-0  md:px-4   md:py-8 md:text-xl lg:h-56 lg:w-[300px] lg:text-2xl xl:w-[350px]"
            >
              <span>{link.icon}</span>
              {link.title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PortalSection
