import { ScrollArea } from '@components/ui/scroll-area'
import Section from './section'

type Props = {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:h-screen  sm:p-4 ">
        <Section
          county={searchParams.county}
          countyId={searchParams.countyId}
          sectionId={searchParams.sectionId}
        />
      </ScrollArea>
    </section>
  )
}
