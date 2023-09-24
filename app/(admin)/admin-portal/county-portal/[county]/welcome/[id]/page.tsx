import React from 'react'
import EditWelcomeSection from './edit-welcome-section';

type PageProps = {
    params: { county: string; id: string }
}
export default function Page({ params }: PageProps) {

  return (
    <section>
      <EditWelcomeSection countyId={params.id} />
    </section>
  );
}
