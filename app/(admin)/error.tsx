'use client'
import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      console.error(error)
      router.push('/admin-portal')
    }, 5000)
  }, [error])
  return (
    <section className="mt-20 h-screen">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={'/android-chrome-512x512.png'}
          alt="blooms hair logo"
          width={300}
          height={300}
        />
        <h1 className="my-5 text-6xl">Whoops!</h1>
        <h2 className="mb-3 text-3xl">Something went wrong!</h2>

        <div className="flex justify-center">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>
        </div>
        <div className="flex justify-center">
          <Button type="button" onClick={() => router.back()}>
            Go back
          </Button>
        </div>
      </div>
    </section>
  )
}
