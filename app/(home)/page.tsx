import React from 'react'
import { Metadata } from 'next'
import FAQSection from '@components/FAQSection'
import FeaturesSection from '@components/FeaturesSection'
import HeroSection from '@components/HeroSection'
import { SectionOne } from '@components/HomePageSections'

// Static metadata
export const metadata: Metadata = {
  title: 'Stepping Stones - Home',
}
 

export default async function Home() {

  return (
    <>
      <HeroSection  />
      {/* <SectionOne /> */}
      <FeaturesSection />
      <FAQSection />
    </>
  )
}
