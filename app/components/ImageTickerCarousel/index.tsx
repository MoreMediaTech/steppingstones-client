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
  counties: CountyDataProps[]
  baseVelocity?: number
}

export function Carousel({ baseVelocity = -1, counties }: CarouselProps) {
  const baseX = useMotionValue(0)

  const scrollVelocity = useVelocity(baseX)
  const scrollAcceleration = useVelocity(scrollVelocity)
  const smoothVelocity = useSpring(scrollAcceleration, {
    damping: 50,
    stiffness: 700,
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
    let moveBy = directionFactor.current * baseVelocity * (delta / 4000)

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
        animate={{ x: 200}}
        style={{ x }}
      >
        {counties?.map((county) => (
          <motion.div className="relative flex flex-col items-center gap-2">
            <motion.div className="relative flex h-[70px] w-[100px]">
              <Image
                src={county.logoIcon ?? '/sohee-kim-NGeVlMIaFsg-unsplash.jpg'}
                alt={`Slide ${county.id}`}
                fill
                className="h-auto w-auto"
                sizes="(max-width: 640px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, (max-width: 1280px) 100px, 100px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                key={county.id}
              />
            </motion.div>
            <motion.h3 className="text-xs font-semibold sm:text-base ">
              {county.name}
            </motion.h3>
          </motion.div>
        ))}
        {counties?.map((county) => (
          <motion.div className="relative flex flex-col items-center gap-2">
            <motion.div className="relative flex h-[70px] w-[100px]">
              <Image
                src={county.logoIcon ?? '/sohee-kim-NGeVlMIaFsg-unsplash.jpg'}
                alt={`Slide ${county.id}`}
                fill
                className="h-auto w-auto"
                sizes="(max-width: 640px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, (max-width: 1280px) 100px, 100px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                key={county.id}
              />
            </motion.div>
            <motion.h3 className="text-xs font-semibold sm:text-base ">
              {county.name}
            </motion.h3>
          </motion.div>
        ))}
        {counties?.map((county) => (
          <motion.div className="relative flex flex-col items-center gap-2">
            <motion.div className="relative flex h-[70px] w-[100px]">
              <Image
                src={county.logoIcon ?? '/sohee-kim-NGeVlMIaFsg-unsplash.jpg'}
                alt={`Slide ${county.id}`}
                fill
                className="h-auto w-auto"
                sizes="(max-width: 640px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, (max-width: 1280px) 100px, 100px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                key={county.id}
              />
            </motion.div>
            <motion.h3 className="text-xs font-semibold sm:text-base ">
              {county.name}
            </motion.h3>
          </motion.div>
        ))}
        {counties?.map((county) => (
          <motion.div className="relative flex flex-col items-center gap-2">
            <motion.div className="relative flex h-[70px] w-[100px]">
              <Image
                src={county.logoIcon ?? '/sohee-kim-NGeVlMIaFsg-unsplash.jpg'}
                alt={`Slide ${county.id}`}
                fill
                className="h-auto w-auto"
                sizes="(max-width: 640px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, (max-width: 1280px) 100px, 100px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                key={county.id}
              />
            </motion.div>
            <motion.h3 className="text-xs font-semibold sm:text-base ">
              {county.name}
            </motion.h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
