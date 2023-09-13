'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@components/ui/button'

export function ThankYou({ user }: { user: string }) {
  const router = useRouter()
  React.useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [])




  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="space-y-4 text-center font-montserrat">
          <h1 className="text-4xl md:text-5xl">
            Thank you <span className='capitalize font-semibold'>{user}</span> for registering!
          </h1>
          <p className="flex flex-col md:text-xl">
            <span>We will be in touch soon.</span>
          </p>
        </div>
        <Button className="mt-4" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </div>
    </section>
  )
}


