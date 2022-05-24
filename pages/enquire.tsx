import { EnquiryForm } from '@components/forms'
import { Badge } from '@mantine/core'
import { MainLayout } from 'layout'
import React from 'react'

const ContactUs = () => {
  return (
    <MainLayout title="Enquire">
      <section className="w-full h-screen bg-white">
        <div className="flex h-[400px] w-full flex-col items-center justify-center bg-blue-300"></div>
        <div className="container mx-auto -my-80 grid grid-cols-1 gap-4 px-2 md:-my-48 md:grid-cols-2 max-w-screen-xl">
          <div className="flex flex-col px-4 py-8">
            <div className="mb-2">
              <Badge color="lime" size="lg" variant="filled">
                Can we have a chat
              </Badge>
            </div>
            <h1 className="text-2xl font-semibold">
              Sen us a quick note about your requirements
            </h1>
            <p className="text-justify font-thin">
              Fill the form and we will respond as soon as
              we can. Alternatively, you can reach out to us at{' '}
              <a
                href="mailto:admin@steppingstonesapp.com"
                className="text-indigo-800"
              >
                our email address
              </a>
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </MainLayout>
  )
}

export default ContactUs
