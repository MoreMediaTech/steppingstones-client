import React from 'react'
import EditLEPSection from './edit-section';

type PageProps = {
    params: { county: string; id: string }
}
export default function Page({ params }: PageProps) {

  return (
    <section>
      <EditLEPSection countyId={params.id} />
    </section>
  );
}
