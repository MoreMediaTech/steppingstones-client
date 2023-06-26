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
    <section>
      <ScrollArea className=" p-4  sm:h-screen ">
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
