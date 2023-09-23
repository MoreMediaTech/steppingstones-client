import React from 'react'

// components
import EditSubSection from './edit-subsection';

type PageProps = {
    params: { county: string; id: string }
}

export default function Page({ params }: PageProps) {
  console.log(params)
  return (
    <section>
      <EditSubSection subSectionId={params.id} />
    </section>
  )
}
