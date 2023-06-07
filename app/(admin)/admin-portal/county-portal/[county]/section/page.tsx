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
        {/* <PortalHeader
          title={`${sectionData?.name ?? 'Section'}`}
          subTitle={
            sectionData?.isSubSection
              ? 'Please select from the menu below'
              : 'Review or edit the content below'
          }
          data={sectionData}
        /> */}
        <Section
          county={searchParams.county}
          countyId={searchParams.countyId}
          sectionId={searchParams.sectionId}
        />
      </section>
    </>
  )
}
