import { ScrollArea } from '@components/ui/scroll-area'
import Districts from './districts'

type Props = {
  searchParams: {
    county: string
    countyId: string
    district: string
    districtId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:p-4  sm:h-screen ">
        <Districts searchParams={searchParams} />
      </ScrollArea>
    </section>
  )
}
