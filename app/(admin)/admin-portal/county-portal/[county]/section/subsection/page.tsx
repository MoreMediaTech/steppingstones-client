import SubSection from './sub-section'

type Props = {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
    subSectionId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <>
      <SubSection searchParams={searchParams} />
    </>
  )
}
