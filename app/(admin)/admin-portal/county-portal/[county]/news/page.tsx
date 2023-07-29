import PortalHeader from 'app/components/PortalHeader'
import News from './news'
import { ScrollArea } from '@components/ui/scroll-area'

type Props = {
  searchParams: { county: string; countyId: string }
}

export default function Page({ searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:p-4  sm:h-screen ">
        <News id={searchParams.countyId} county={searchParams.county} />
      </ScrollArea>
    </section>
  )
}
