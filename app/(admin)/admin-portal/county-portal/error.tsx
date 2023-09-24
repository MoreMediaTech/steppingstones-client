'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@components/ui/button'


export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()
  return (
    <section className="mt-20 h-screen">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-2">
        <Image
          src={'/android-chrome-512x512.png'}
          alt="Stepping Stones Logo"
          width={300}
          height={300}
        />
        <h1 className="my-5 text-6xl">Whoops!</h1>
        <h2 className="mb-3 text-3xl">Something went wrong!</h2>
        <p className="mb-3 text-xl">{error.name}: {error.message}</p>
        <div className="flex w-full items-center justify-center gap-6">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>

          <Button type="button" onClick={() => router.back()}>
            Go back
          </Button>
        </div>
      </div>
    </section>
  )
}
