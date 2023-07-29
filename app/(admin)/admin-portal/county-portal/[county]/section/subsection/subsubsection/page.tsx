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
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:p-4  sm:h-screen ">
        <SubSubSection searchParams={searchParams} />
      </ScrollArea>
    </section>
  )
}
