import PortalHeader from 'app/components/PortalHeader'

import LEP from './lep'

export default function Page({
  searchParams,
}: {
  searchParams: { county: string; countyId: string }
}) {
  return (
    <section className="container mx-auto">
      <LEP id={searchParams.countyId} county={searchParams.county} />
    </section>
  )
}
