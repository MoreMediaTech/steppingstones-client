import { ScrollArea } from '@components/ui/scroll-area'
import District from './district'

type Props = {
  params: { id: string }
  searchParams: {
    county: string
    countyId: string
    district: string
    districtId: string
  }
}

export default function Page({ params, searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:p-4  sm:h-screen ">
        <District
          id={params.id}
          county={searchParams.county}
          countyId={searchParams.countyId}
          district={searchParams.district}
          districtId={searchParams.districtId}
        />
      </ScrollArea>
    </section>
  )
}
