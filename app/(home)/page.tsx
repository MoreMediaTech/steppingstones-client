import React from 'react'
import AboutSection from '@components/AboutSection'
import FAQSection from '@components/FAQSection'
import FeaturesSection from '@components/FeaturesSection'
import HeroSection from '@components/HeroSection'

export default function Home(){
  return (
        <>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <FAQSection />
        </>
  )
}

