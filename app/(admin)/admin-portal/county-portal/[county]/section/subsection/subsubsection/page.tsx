import { ScrollArea } from '@components/ui/scroll-area'
import SubSubSection from './subsub-section'

type Props = {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
    subSectionId: string
    subSubSectionId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <section>
      <ScrollArea className=" p-4  sm:h-screen ">
        <SubSubSection searchParams={searchParams} />
      </ScrollArea>
    </section>
  )
}
