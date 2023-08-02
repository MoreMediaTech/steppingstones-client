import { RegisterNowForm } from './register-now-form'
import React from 'react'

export default function RegisterNow() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="space-y-4">
          <h1 className="text-4xl text-[#00DCB3] md:text-5xl">
            Launching Soon
          </h1>
          <p className="flex flex-col md:text-xl">
            <span>Beta Launch Ahead!</span>
            <span>Sign up to receive updates and notifications.</span>
          </p>
          <RegisterNowForm />
        </div>
      </div>
    </section>
  )
}
