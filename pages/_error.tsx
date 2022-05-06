import { Button } from '@mantine/core'
import { MainLayout } from 'layout'
import { NextPageContext } from 'next'
import { ErrorProps } from 'next/error'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from 'next/image'

function Error({ statusCode }: ErrorProps) {
    const router = useRouter()
    useEffect(() => {
      setTimeout(() => {
        router.push('/')
      }, 5000)
    }, [])
  return (
    <MainLayout title={`${statusCode} error on server`}>
      <section className="h-screen">
        <div className="flex items-center justify-center">
          <Image
            src={'/android-chrome-512x512.png'}
            alt="blooms hair logo"
            width={300}
            height={300}
          />
          <h1 className="my-5 text-6xl">Whoops!</h1>
          <p>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </p>
          <div className="flex justify-center">
            <Button type="button" onClick={() => router.back()}>
              GO BACK
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
