import { ScrollArea } from '@components/ui/scroll-area'
import Section from './section'

type Props = {
  params: { location: string }
  searchParams: {
    contentId: string
    section: string
    sectionId: string
  }
}

export default function Page({ params, searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:h-screen  sm:p-4 ">
        <Section
          location={params.location}
          contentId={searchParams.contentId}
          sectionId={searchParams.sectionId}
        />
      </ScrollArea>
    </section>
  )
}
