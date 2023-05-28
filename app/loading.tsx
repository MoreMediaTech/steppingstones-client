'use client'
import { Loader } from '@mantine/core'

export default function Loading() {
  return (
    <section className="flex flex-col h-screen items-center justify-center w-full">
      <Loader size="xl" variant="bars" />
    </section>
  )
}
