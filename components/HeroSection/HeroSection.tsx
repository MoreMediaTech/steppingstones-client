import { SignUpForm } from '@components/forms'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="relative md:h-[800px] flex items-center justify-center  p-4 ">
      <div className="absolute h-full w-full bg-cover bg-center bg-no-repeat">
        <div className="relative h-full w-full">
          <Image
            src={'/sohee-kim-NGeVlMIaFsg-unsplash.jpg'}
            layout="fill"
            objectFit="cover"
            quality={50}
            priority
          />
          <div
            id="blackOverlay"
            className="absolute h-full w-full bg-black opacity-50"
          ></div>
        </div>
      </div>
      <div className="relative grid grid-cols-1 sm:max-w-screen-xl sm:gap-12 sm:space-x-14 md:grid-cols-2 ">
        <div className="   ">
          <Image
            src={'/SS_APP.png'}
            alt="image by Sohee Kim"
            width={1000}
            height={1000}
            objectFit="cover"
            layout='responsive'
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="space-y-4">
            <h1 className="text-4xl text-white md:text-6xl">Launching Soon</h1>
            <p className="flex flex-col text-white md:text-xl">
              <span>Beta Launch Ahead!</span>
              <span>Sign up to receive a special invitation</span>
            </p>
            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
