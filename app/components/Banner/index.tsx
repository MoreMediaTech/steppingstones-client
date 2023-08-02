'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { BiChevronRightCircle } from 'react-icons/bi'
import { Button } from '@components/ui/button'

export default function Banner() {
  const router = useRouter()
  return (
    <section className="flex w-full items-center justify-center bg-accent-dark-200 py-1 sm:px-16">
      <div className="flex flex-row items-center  justify-center gap-1 px-4 md:px-0">
        <div className=" flex  w-full flex-wrap items-center break-all  px-2 text-justify font-montserrat font-semibold text-textLight md:px-0">
          <p className=" text-sm sm:text-[min(5vw, 0.5rem)]">
            <span className="mr-1 text-primary-dark-600">Register now</span>
            <span>
              for updates and notifications on Stepping Stones progress
            </span>
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="text-2xl flex items-center justify-center"
          onClick={() => router.push('/register-now')}
        >
          <BiChevronRightCircle className="text-textLight" />
        </Button>
      </div>
    </section>
  )
}
