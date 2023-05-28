'use client'
// components/RouterTransition.tsx
import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { NavigationProgress, nprogress } from '@mantine/nprogress'

export default function RouterTransition() {
  const router = useRouter()
  const pathname = usePathname() as string
  const searchParams = useSearchParams()

  // useEffect(() => {
  //   const handleStart = (url: string) =>
  //     url !== pathname && nprogress.start()
  //   const handleComplete = () => nprogress.complete()
  //   const url = pathname + searchParams?.toString()

  //   handleStart(url)

  // }, [pathname, router, searchParams])

  return <NavigationProgress autoReset={true} />
}
