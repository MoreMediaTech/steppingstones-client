import County from './county'

type Props = {
  params: { county: string }
  searchParams: { countyId: string }
}

export default function Page({ params, searchParams }: Props) {
  return (
    <section className="h-screen overflow-auto">
      <County county={params.county} countyId={searchParams.countyId} />
    </section>
  )
}
