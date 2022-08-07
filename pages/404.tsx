import { Button } from '@mantine/core'
import { MainLayout } from 'layout'
import { NextPageContext } from 'next'
import { ErrorProps } from 'next/error'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from 'next/image'


function NotFoundPage() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.back()
    }, 5000)
  }, [])
  return (
    <MainLayout title="Page Not Found">
      <section className="h-screen mt-14 overflow-hidden bg-white text-gray-900 ">
        <div className="mt-20 flex flex-col items-center">
          <Image
            src={'/android-chrome-512x512.png'}
            alt="blooms hair logo"
            width={300}
            height={300}
          />
          <h1 className="my-5 text-6xl">Whoops!</h1>
          <h2 className="mb-5 text-4xl text-gray-500">
            This page does not exist.
          </h2>
          <div className="flex justify-center">
            <Button type="button" color="dark" onClick={() => router.back()}>
              GO BACK
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default NotFoundPage