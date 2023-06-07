import District from './district'

type Props = {
  params: { id: string }
  searchParams: {
    county: string
    countyId: string
    district: string
    districtId: string
  }
}

export default function Page({ params, searchParams }: Props) {

  return (
    <>
      <District
        id={params.id}
        county={searchParams.county}
        countyId={searchParams.countyId}
        district={searchParams.district}
        districtId={searchParams.districtId}
      />
    </>
  )
}
