import { ScrollArea } from '@components/ui/scroll-area'
import County from './county'

type Props = {
  params: { county: string }
  searchParams: { countyId: string }
}

export default function Page({ params, searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:h-screen  sm:p-4 ">
        <County county={params.county} countyId={searchParams.countyId} />
      </ScrollArea>
    </section>
  )
}
