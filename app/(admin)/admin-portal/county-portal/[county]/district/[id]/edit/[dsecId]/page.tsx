import React from 'react'
import EditDistrictContent from './edit-disctrict-content';

type PageProps = {
    params: { county: string; dsecId: string }
}
export default function Page({ params }: PageProps) {

  return (
    <section>
      <EditDistrictContent districtSectionId={params.dsecId} />
    </section>
  );
}