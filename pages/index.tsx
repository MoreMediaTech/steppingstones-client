import AboutSection from '@components/AboutSection'
import FAQSection from '@components/FAQSection'
import FeaturesSection from '@components/FeaturesSection'
import HeroSection from '@components/HeroSection'
import { MainLayout } from 'layout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <MainLayout title="Home">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <FAQSection />
    </MainLayout>
  )
}

export default Home
