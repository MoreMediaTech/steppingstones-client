'use client'

import { LoginForm } from './LoginForm'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaSignInAlt } from 'react-icons/fa'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function Login() {
  return (
    <section className="relative h-screen w-full grid md:grid-cols-2">
      <div className=" top-0 h-full w-full bg-cover bg-center hidden md:block">
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
            <h1 className="flex items-center gap-2 text-4xl">
              <FaSignInAlt fontSize={40} color="#00DCB3" />
              <span className="text-primary-dark-100">Sign In</span>
            </h1>
            <div className="w-full max-w-screen-sm px-6 py-4 border border-gray-900 dark:border-gray-200 rounded-md">
              <LoginForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
