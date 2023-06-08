import Districts from './districts'



type Props = {
  searchParams: {
    county: string
    countyId: string
    district: string
    districtId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <>
      <Districts searchParams={searchParams} />
    </>
  )
}
