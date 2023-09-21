import LEP from './lep'
import { ScrollArea } from '@components/ui/scroll-area';

export default function Page({
  searchParams,
}: {
  searchParams: { county: string; countyId: string }
}) {
  return (
    <section className="sm:container sm:mx-auto px-2">
      <ScrollArea className=" sm:h-screen sm:p-4 ">
        <LEP id={searchParams.countyId} county={searchParams.county} />
      </ScrollArea>
    </section>
  )
}
