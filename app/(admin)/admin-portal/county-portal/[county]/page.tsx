import { ScrollArea } from '@components/ui/scroll-area'
import County from './county'

type Props = {
  params: { county: string }
  searchParams: { countyId: string }
}

export default function Page({ params, searchParams }: Props) {
  return (
    <section>
      <ScrollArea className=" p-4  sm:h-screen ">
        <County county={params.county} countyId={searchParams.countyId} />
      </ScrollArea>
    </section>
  )
}
