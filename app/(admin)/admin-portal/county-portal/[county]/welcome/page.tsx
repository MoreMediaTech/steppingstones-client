import { ScrollArea } from '@components/ui/scroll-area'
import Welcome from './welcome'

type Props = {
  searchParams: { county: string; countyId: string }
}

export default function Page({ searchParams }: Props) {
  return (
    <section>
      <ScrollArea className=" p-4  sm:h-screen ">
        <Welcome id={searchParams.countyId} county={searchParams.county} />
      </ScrollArea>
    </section>
  )
}
