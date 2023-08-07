import React from 'react'
import AboutSection from '@components/AboutSection'
import FAQSection from '@components/FAQSection'
import FeaturesSection from '@components/FeaturesSection'
import HeroSection from '@components/HeroSection'
import { SectionOne } from '@components/HomePageSections'

async function getFeed() {
  const res = await fetch('https://steppingstonesapp.com/api/v1/feed', {
    cache: 'force-cache'
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getFeed()
  return (
    <>
      <HeroSection data={data} />
      <SectionOne />
      {/* <AboutSection /> */}
      <FeaturesSection />
      <FAQSection />
    </>
  )
}
