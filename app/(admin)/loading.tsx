'use client'
import { Loader } from '@mantine/core'

export default function Loading() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <Loader size="xl" variant="bars" />
    </section>
  )
}
