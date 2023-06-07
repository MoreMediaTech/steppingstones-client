import Welcome from './welcome'

type Props = {
  searchParams: { county: string; countyId: string }
}

export default function Page({
  searchParams,
}: Props) {
  return (
    <section className="h-screen overflow-auto ">
      <Welcome id={searchParams.countyId} county={searchParams.county} />
    </section>
  )
}
