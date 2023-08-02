'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@components/ui/button'

const imageVariants = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
}
const imageVariants2 = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '90%' },
}
const imageVariants3 = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
}

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex h-[800px] items-center  justify-center p-4"
    >
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
      <div className="relative flex max-w-screen-md items-center justify-center sm:container sm:mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
          <div className="relative col-span-1 flex flex-col justify-center space-y-4">
            <h1 className="text-5xl text-textLight">
              Empowering Business for Success
            </h1>
            <p className="text-primary-light-300">
              Your Gateway to Growth and Support
            </p>
            <Button type="button" className="w-1/3">
              Get Started
            </Button>
          </div>
          <div className="relative z-50 col-span-1">
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
              transition={{ type: 'spring', duration: 5 }}
              className="relative h-[500px] w-full bg-accent"
            >
              <div className="h-54 w-full">image</div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants2}
              transition={{ type: 'spring', duration: 5 }}
              className="absolute z-50 bottom-0 -left-20 h-[200px] w-1/2 mr-4  bg-red-400"
            >
              <div className="w-full">image</div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants3}
              transition={{ type: 'spring', duration: 5 }}
              className="absolute z-50 top-20 -right-16 h-[100px] w-2/3 bg-orange-400"
            >
              <div className=" w-full">image</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
