import React from 'react'
import EditNewsSection from './edit-section';

type PageProps = {
    params: { county: string; id: string }
}
export default function Page({ params }: PageProps) {

  return (
    <section>
      <EditNewsSection countyId={params.id} />
    </section>
  );
}
