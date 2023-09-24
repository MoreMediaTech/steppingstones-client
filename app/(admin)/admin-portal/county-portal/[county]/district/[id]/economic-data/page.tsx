import React from 'react'
import { useSearchParams } from 'next/navigation'
import { EconomicData } from './economic-data'

type PageProps = {
    params: { county: string, id: string }
    searchParams: { countyId: string, districtId: string, district: string }
}

export default function Page({ params, searchParams }: PageProps) {

  return (
    <section>
        <EconomicData districtSectionId={params.id} />
    </section>
  )
}
