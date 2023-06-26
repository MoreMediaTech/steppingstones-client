import PortalHeader from 'app/components/PortalHeader'

import LEP from './lep'
import { ScrollArea } from '@components/ui/scroll-area';

export default function Page({
  searchParams,
}: {
  searchParams: { county: string; countyId: string }
}) {
  return (
    <section className="container mx-auto">
      <ScrollArea className=" p-4  sm:h-screen ">
        <LEP id={searchParams.countyId} county={searchParams.county} />
      </ScrollArea>
    </section>
  )
}
