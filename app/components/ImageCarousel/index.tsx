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

type CarouselProps = {
  images: string[]
  baseVelocity?: number
}

export function Carousel({ images, baseVelocity = -3 }: CarouselProps) {
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
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative h-[150px] w-full max-w-full flex flex-nowrap whitespace-nowrap overflow-x-hidden px-4 py-6 ">
      <motion.div
        className="absolute flex-nowrap flex items-center gap-24  whitespace-nowrap"
        style={{ x }}
      >
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{
              width: '100px',
              height: '100px',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
