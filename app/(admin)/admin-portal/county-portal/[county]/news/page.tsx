import PortalHeader from 'app/components/PortalHeader'
import News from './news'

type Props = {
  searchParams: { county: string; countyId: string }
}

export default function Page({ searchParams }: Props) {
  return (
    <section className="container mx-auto">
      <News id={searchParams.countyId} county={searchParams.county} />
    </section>
  )
}
