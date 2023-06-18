import Section from './section'

type Props = {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <>
      <section className="h-screen overflow-auto">
        <Section
          county={searchParams.county}
          countyId={searchParams.countyId}
          sectionId={searchParams.sectionId}
        />
      </section>
    </>
  )
}
