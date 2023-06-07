import PortalHeader from 'app/components/PortalHeader'
import News from './news'

type Props = {
  searchParams: { county: string; countyId: string }
}

export default function Page({ searchParams }: Props) {
  return (
    <section className="h-screen overflow-auto">
      <section className="sticky w-full">
        <PortalHeader
          title={`${searchParams.county}`}
          subTitle="Please Preview or Edit your content"
        />
      </section>

      <section className="container mx-auto">
        <News id={searchParams.countyId} county={searchParams.county} />
      </section>
    </section>
  )
}
