'use client'
import { Suspense } from 'react'
import { LoginForm } from 'app/components/forms'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from 'app/components/spinner/Spinner'
// import { Loader } from '@mantine/core'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function Login() {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute top-0 h-full w-full bg-cover bg-center">
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
        <div className="flex h-full flex-col flex-wrap items-center justify-center">
          <motion.div
            className="flex w-full flex-col items-center space-y-2 opacity-75"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 1.0, duration: 2.0 }}
          >
            <div>
              <Image
                src={'/android-chrome-512x512.png'}
                alt="Stepping stones app logo"
                width={250}
                height={250}
                priority
              />
            </div>
            <h1 className="flex items-center gap-2 text-4xl">
              <FaSignInAlt fontSize={40} color="#00DCB3" />
              <span className="text-primary-dark-100">Sign In</span>
            </h1>
            <Suspense fallback={<Spinner classes="w-8 h-8" />}>
              <LoginForm />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
