import React from 'react'

import { Metadata } from 'next'
import { ThankYou } from './thank-you'

// Static metadata
export const metadata: Metadata = {
  title: 'Stepping Stones - Register Now',
}

type Props = {
  params: { user: string }
}

export default function RegisterNow({ params }: Props) {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">
      <ThankYou user={params.user} />
    </section>
  )
}
