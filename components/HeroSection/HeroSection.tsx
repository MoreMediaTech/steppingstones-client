import { SignUpForm } from '@components/forms'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section id='heroSection' className="relative flex items-center justify-center p-4  md:h-[800px] mt-14 md:mt-0">
      <div className="absolute h-full w-full bg-cover bg-center bg-no-repeat">
        <div className="relative h-full w-full">
          <Image
            src={'/sohee-kim-NGeVlMIaFsg-unsplash.jpg'}
            alt="image by Sohee Kim"
            quality={50}
            fill
            priority
          />
          <div
            id="blackOverlay"
            className="absolute h-full w-full bg-black opacity-60"
          ></div>
        </div>
      </div>
      <div className="relative grid grid-cols-1 sm:max-w-screen-xl sm:gap-12 sm:space-x-14 md:grid-cols-2 ">
        <div className="   ">
          <Image
            src={'/ssapp_hero_section.png'}
            alt="Hero section image"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="space-y-4">
            <h1 className="text-4xl text-[#00DCB3] md:text-5xl">
              Launching Soon
            </h1>
            <p className="flex flex-col text-white md:text-xl">
              <span>Beta Launch Ahead!</span>
              <span>Sign up to receive a special invitation.</span>
            </p>
            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
