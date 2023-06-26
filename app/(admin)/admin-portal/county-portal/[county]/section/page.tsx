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
    <section>
      <ScrollArea className=" p-4  sm:h-screen ">
        <Section
          county={searchParams.county}
          countyId={searchParams.countyId}
          sectionId={searchParams.sectionId}
        />
      </ScrollArea>
    </section>
  )
}
