import React from 'react'
import { Metadata } from 'next'
import AboutSection from './AboutSection'

// Static metadata
export const metadata: Metadata = {
  title: 'Stepping Stones - About',
}
 

export default function AboutPage() {
  return (
    <section>
      <AboutSection />
    </section>
  )
}
