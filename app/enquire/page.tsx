import { EnquiryForm } from '@components/forms'
import Image from 'next/image'

const ContactUs = () => {
  return (
    <section className="grid w-full md:mb-4">
      <div className="relative w-full md:mt-14" style={{ height: '600px' }}>
        <Image
          src={'/enquire_section_img.png'}
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

      <div className=" mx-auto container  grid max-w-screen-md grid-cols-1 place-content-center md:gap-4 md:grid-cols-2 p-2 md:p-4">
        <div className="flex flex-col px-4 py-8"></div>
        <EnquiryForm />
      </div>
    </section>
  )
}

export default ContactUs
