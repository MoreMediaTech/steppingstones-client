'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import VerificationForm from './verification-form'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function Verification() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  return (
    <section className="relative grid h-screen w-full md:grid-cols-2">
      <div className=" top-0 hidden h-full w-full bg-cover bg-center md:block">
        <div
          className="relative h-full w-full"
          style={{ width: '100%', height: '100%' }}
        >
          <Image
            src={'/SS_Staircase.jpeg'}
            alt="Staircase image"
            quality={50}
            priority
            fill
            style={{ objectFit: 'cover' }}
          />
          <div
            id="blackOverlay"
            className="absolute h-full w-full bg-black opacity-50"
          ></div>
        </div>
      </div>
      <div className="container relative mx-auto h-full">
        <div className="flex h-full flex-col flex-wrap items-center justify-center md:px-4">
          <motion.div
            className="w-full space-y-8  opacity-75"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 1.0, duration: 2.0 }}
          >
            <div className="space-y-2 text-left">
              <h1 data-test="verification-page-title" className="flex items-center font-montserrat text-4xl font-bold md:text-5xl">
                Enter verification code!
              </h1>
              <p className="text-lg font-thin">
                We have sent you a verification code to {email}.
              </p>
            </div>
            <div className="w-full rounded-md border border-gray-900 px-6 py-4 dark:border-gray-200">
              <VerificationForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
