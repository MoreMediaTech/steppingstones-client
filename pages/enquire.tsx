import { EnquiryForm } from '@components/forms'
import { Badge } from '@mantine/core'
import { MainLayout } from 'layout'
import Image from 'next/image'

const ContactUs = () => {
  return (
    <MainLayout title="Enquire">
      <section className="flex flex-grow mb-96 md:mb-4 mt-14 w-full min-h-screen">
        <div className="relative h-[600px] w-full bg-cover bg-center bg-no-repeat">
          <div className="relative h-full w-full">
            <Image
              src={'/enquire_section_img.png'}
              layout="fill"
              objectFit="cover"
              quality={50}
              priority
            />
            <div
              id="blackOverlay"
              className="absolute h-full w-full bg-black opacity-60"
            ></div>
          </div>
        </div>
        <div className="absolute w-full flex-grow px-2 md:px-16">
          <div className="container mx-auto mt-56 grid w-full max-w-screen-xl grid-cols-1 gap-4 px-2 md:my-56 lg:grid-cols-2">
            <div className="flex flex-col px-4 py-8"></div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default ContactUs
