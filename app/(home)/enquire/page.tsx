import { EnquiryForm } from './EnquiryForm'
import Image from 'next/image'

const ContactUs = () => {
  return (
    <section className="grid w-full md:grid-cols-2">
      <div className="relative w-full h-screen" >
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

      <div className="flex w-full items-center justify-center p-2 md:px-6 md:py-8">
        <EnquiryForm />
      </div>
    </section>
  )
}

export default ContactUs
