import Image from 'next/image'
import React from 'react'

const AboutSection = () => {
  return (
    <section id="about" className="space-y-8 bg-white pt-24 pb-4">
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-medium text-[#5E17EB]">
          About
        </h1>
        <h3 className="text-center text-xl font-bold text-[#00DCB3]">
          Information that fits your business needs.
        </h3>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
        <div className="relative h-72 w-full md:h-80 ">
          <Image
            src={'/about_section_img1.1.png'}
            alt="Photo by Will Dunkley on Unsplash"
            objectFit="cover"
            layout="responsive"
            width={900}
            height={460}
          />
        </div>
        <div className="md:items-left flex items-center p-2 text-justify">
          <div className="space-y-2">
            <h3 className="text-center text-lg font-medium text-[#5E17EB] md:text-left">
              What is the app all about?
            </h3>
            <p>
              Our app provides a single point of access to the often complicated
              landscape of national and local business support making it easier
              for businesses to gain the help and advice they need to thrive and
              grow to the next level. We are not just a service, but the
              building blocks of information that startups and established
              businesses need.
            </p>
            <div className="flex w-full justify-center md:justify-end">
              <button
                type="button"
                className="rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 duration-300 
                ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:w-1/4 md:text-xl lg:text-2xl"
              >
                See Demo
              </button>
            </div>
          </div>
        </div>
        <div className="md:items-left  order-3 flex items-center p-2 text-justify md:order-none">
          <div className="space-y-2">
            <h3 className="text-center text-lg font-medium text-[#5E17EB] md:text-left">
              Why now?
            </h3>
            <p>
              We were inspired by Business Boost, Ashfield District Council
              Business Support Service that brought together public and private
              sector partners to promote, coordinate and deliver a wide range of
              free and partially free business support based on local needs.
            </p>
            <p className="font-semibold text-indigo-900">
              Interested in keeping in touch? Sign up for a special invitation
              or contact us for partnership inquiries.
            </p>
            <div className="flex w-full justify-center md:justify-start">
              <button
                type="button"
                className="rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 duration-300 
                ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:w-1/4 md:text-xl lg:text-2xl"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <Image
            src={'/about_section_img2.png'}
            alt="Photo by Tom Podmore on Unsplash"
            objectFit="cover"
            layout="responsive"
            width={900}
            height={460}
          />
        </div>
      </div>
    </section>
  )
}

export default AboutSection
