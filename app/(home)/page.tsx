import React from 'react'
import AboutSection from 'app/components/AboutSection'
import FAQSection from 'app/components/FAQSection'
import FeaturesSection from 'app/components/FeaturesSection'
import HeroSection from 'app/components/HeroSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <FAQSection />
    </>
  )
}
