import React from 'react'
import AboutSection from '@components/AboutSection'
import FAQSection from '@components/FAQSection'
import FeaturesSection from '@components/FeaturesSection'
import HeroSection from '@components/HeroSection'
import { SectionOne } from '@components/HomePageSections'

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionOne />
      {/* <AboutSection /> */}
      <FeaturesSection />
      <FAQSection />
    </>
  )
}
