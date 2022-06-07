import Image from 'next/image'
import React from 'react'

const AboutSection = () => {
  return (
    <section id="about" className="space-y-8 bg-white pt-24 pb-4">
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-medium text-indigo-900">
          About
        </h1>
        <h3 className="text-center text-xl font-bold text-sky-500">
          information to fit your business needs.
        </h3>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className=" w-full ">
          <Image
            src={'/will-dunkley-RdyNNqHnLwQ-unsplash.jpg'}
            alt="Photo by Will Dunkley on Unsplash"
            objectFit="cover"
            layout="responsive"
            width={900}
            height={460}
          />
        </div>
        <div className="items-left flex items-center p-2 text-justify">
          <div className="space-y-2">
            <h3 className="font-medium text-indigo-900">
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
            <button
              type="button"
              className="rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
            >
              See Demo
            </button>
          </div>
        </div>
        <div className="items-left  order-3 flex items-center p-2 text-justify md:order-none">
          <div className="space-y-2">
            <h3 className="font-medium text-indigo-900">Why now?</h3>
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
            <button
              type="button"
              className="rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="w-full ">
          <Image
            src={'/tom-podmore-hWMwHgkjcKU-unsplash.jpg'}
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
