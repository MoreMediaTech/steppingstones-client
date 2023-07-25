'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Button from 'app/components/Button'

const AboutSection = () => {
  return (
    <section id="about" className=" pb-4 pt-24">
      <div className="mx-auto max-w-screen-md space-y-8">
        <div className="space-y-4">
          <h1 className="text-center text-4xl font-medium text-primary-dark-100 dark:text-primary-light-600">
            About
          </h1>
          <h3 className="text-center text-xl font-bold text-[#00DCB3]">
            Information that fits your business needs.
          </h3>
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="relative h-[288px] w-full ">
            <Image
              src={'/about_section_img1.1.png'}
              alt="Photo by Will Dunkley on Unsplash"
              quality={50}
              fill
              sizes="100%"
            />
          </div>
          <div className="md:items-left flex items-center p-2 text-justify">
            <div className="space-y-2">
              <h3 className="text-center text-lg font-medium text-primary-dark-100 dark:text-primary-light-600 md:text-left">
                What is the app all about?
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                Our app provides a single point of access to the often
                complicated landscape of national and local business support
                making it easier for businesses to gain the help and advice they
                need to thrive and grow to the next level. We are not just a
                service, but the building blocks of information that startups
                and established businesses need.
              </p>
              <div className="flex w-full justify-center md:justify-end">
                <Button type="button" color="primary" onClick={() => null}>
                  See Demo
                </Button>
              </div>
            </div>
          </div>
          <div className="md:items-left  order-3 flex items-center p-2 text-justify md:order-none">
            <div className="space-y-2">
              <h3 className="text-center text-lg font-medium text-primary-dark-100 dark:text-primary-light-600 md:text-left">
                Why now?
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                We were inspired by Business Boost, Ashfield District Council
                Business Support Service that brought together public and
                private sector partners to promote, coordinate and deliver a
                wide range of free and partially free business support based on
                local needs.
              </p>
              <p className="font-semibold text-primary-dark-100 dark:text-primary-light-600">
                Interested in keeping in touch? Sign up for a special invitation
                or contact us for partnership inquiries.
              </p>
              <div className="flex w-full justify-center md:justify-start">
                <Button type="button" color="primary" onClick={() => null}>
                  <Link href="#heroSection">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative h-[288px] w-full ">
            <Image
              src={'/about_section_img2.png'}
              alt="Photo by Tom Podmore on Unsplash"
              quality={50}
              fill
              sizes="100%"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
