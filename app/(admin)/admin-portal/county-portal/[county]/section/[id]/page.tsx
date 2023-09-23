import React from 'react'
import EditSection from './edit-section';

type PageProps = {
    params: { county: string; id: string }
}
export default function Page({ params }: PageProps) {
    console.log(params)
  return (
    <section>
      <EditSection sectionId={params.id} />
    </section>
  );
}
