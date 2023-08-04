'use client'
import React from 'react'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion'
import { wrap } from '@motionone/utils'
import { CountyDataProps } from '@lib/types'
import Image from 'next/image'

type CarouselProps = {
  images: string[]
  counties: CountyDataProps[]
  baseVelocity?: number
}

export function Carousel({
  images,
  baseVelocity = -2,
  counties,
}: CarouselProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = 1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative flex h-[150px] w-full max-w-full flex-nowrap overflow-x-hidden whitespace-nowrap px-4 py-6 ">
      <motion.div
        className="absolute flex flex-nowrap items-center gap-28  whitespace-nowrap"
        style={{ x }}
      >
        {counties?.map((county) => (
          <motion.div className="w-full h-full flex flex-col items-center gap-2">
            <Image
              src={county.logoIcon ?? '/sohee-kim-NGeVlMIaFsg-unsplash.jpg'}
              alt={`Slide ${county.id}`}
              width={100}
              height={70}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
              key={county.id}
            />
            <motion.h3 className="text-xs font-semibold sm:text-base ">
              {county.name}
            </motion.h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
