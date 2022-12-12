import React from 'react'
import AboutSection from '@components/AboutSection'
import FAQSection from '@components/FAQSection'
import FeaturesSection from '@components/FeaturesSection'
import HeroSection from '@components/HeroSection'
import { MainLayout } from 'layout'
import useHasMounted from '@hooks/useHasMounted'

const Home = () => {
  const hasMounted = useHasMounted()
  return hasMounted && (
    <MainLayout title="Home">
      <section>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <FAQSection />
      </section>
    </MainLayout>
  )
}

export default Home
