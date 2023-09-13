import Image from 'next/image'
import { Metadata } from 'next'
import { EnquiryForm } from './EnquiryForm'

// Static metadata
export const metadata: Metadata = {
  title: 'Stepping Stones - Enquire',
}

export default function EnquiryPage() {
  return (
    <section className="relative grid h-screen w-full md:grid-cols-2">
      <div className="relative hidden h-screen w-full md:block">
        <Image
          src={'/smartmockups.jpg'}
          alt="Enquire section image"
          quality={50}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div
          id="blackOverlay"
          className="absolute h-full w-full bg-black opacity-60"
        ></div>
      </div>

      <div className="container relative mx-auto h-screen w-full px-4  py-16 md:px-6">
        <div className="flex w-full items-center justify-center   ">
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}
