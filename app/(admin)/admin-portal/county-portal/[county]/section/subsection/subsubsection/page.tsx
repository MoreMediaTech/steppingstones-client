import SubSubSection from './subsub-section'

type Props = {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
    subSectionId: string
    subSubSectionId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <>
      <SubSubSection searchParams={searchParams} />
    </>
  )
}
