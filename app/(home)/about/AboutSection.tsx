'use client'
import React from 'react'
import Image from 'next/image'
// import Link from 'next/link'

// import Button from 'app/components/Button'

const AboutSection = () => {
  return (
    <section id="about" className=" pb-4 pt-36">
      <div className="space-y-8 px-2 sm:container sm:mx-auto sm:px-0">
        <div className="items-center space-y-4 text-center">
          <h1
            data-test="about-page-title"
            className="text-center text-4xl font-medium text-primary-dark-100 dark:text-primary-light-600"
          >
            About
          </h1>
          <h4
            data-test="about-page-subtitle"
            className="text-center text-xl font-bold text-accent-dark-300"
          >
            Information that fits your business needs.
          </h4>
        </div>
        <div className="grid grid-cols-1 gap-4 py-8 md:gap-6">
          <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-6">
            <div className="relative h-[288px] w-full ">
              <Image
                src={'/smartmockups2.jpg'}
                alt="Second Smart mockup image"
                quality={50}
                fill
                sizes="100%"
              />
            </div>
            <div className="md:items-left flex items-center p-2 text-justify">
              <div className="space-y-2">
                <h3 className="text-center text-lg font-medium text-primary-dark-200 dark:text-primary-light-600 md:text-left">
                  What is the app all about?
                </h3>
                <p className="text-gray-800 dark:text-gray-200">
                  Our app provides a single point of access to the often
                  complicated landscape of national and local business support
                  making it easier for businesses to gain the help and advice
                  they need to thrive and grow to the next level. We are not
                  just a service, but the building blocks of information that
                  startups and established businesses need.
                </p>
                {/* <div className="flex w-full justify-center md:justify-end">
                  <Button type="button" color="primary" onClick={() => null}>
                    See Demo
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-6">
            <div className="md:items-left  order-3 flex items-center p-2 text-justify md:order-none">
              <div className="space-y-2">
                <h3 className="text-center text-lg font-medium text-primary-dark-200 dark:text-primary-light-600 md:text-left">
                  Why now?
                </h3>
                <p className="text-gray-800 dark:text-gray-200">
                  We were inspired by Business Boost, Ashfield District Council
                  Business Support Service that brought together public and
                  private sector partners to promote, coordinate and deliver a
                  wide range of free and partially free business support based
                  on local needs.
                </p>
                <p className="font-semibold text-primary-dark-100 dark:text-primary-light-600">
                  Interested in keeping in touch? Sign up for a special
                  invitation or contact us for partnership inquiries.
                </p>
                {/* <div className="flex w-full justify-center md:justify-start">
                  <Button type="button" color="primary" onClick={() => null}>
                    <Link href="#heroSection">Sign Up</Link>
                  </Button>
                </div> */}
              </div>
            </div>
            <div className="relative h-[288px] w-full ">
              <Image
                src={'/smartmockups3.jpg'}
                alt="Third Smart mockup image"
                quality={50}
                fill
                sizes="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
