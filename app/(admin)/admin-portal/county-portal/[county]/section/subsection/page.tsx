import { ScrollArea } from '@components/ui/scroll-area'
import SubSection from './sub-section'

type Props = {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
    subSectionId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <section>
      <ScrollArea className=" p-4  sm:h-screen ">
        <SubSection searchParams={searchParams} />
      </ScrollArea>
    </section>
  )
}
