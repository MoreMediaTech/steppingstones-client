import PortalHeader from 'app/components/PortalHeader'

import LEP from './lep'


export default function Page({
  searchParams,
}: {
  searchParams: { county: string; countyId: string }
}) {

  return (
    <section className="h-screen overflow-auto">
      <section className="sticky w-full">
        <PortalHeader
          title={`${searchParams.county} County`}
          subTitle="Please Preview or Edit your content"
        />
      </section>

      <section className="container mx-auto">
        <LEP
          id={searchParams.countyId}
          county={searchParams.county}
          countyId={searchParams.countyId}
        />
      </section>
    </section>
  )
}
