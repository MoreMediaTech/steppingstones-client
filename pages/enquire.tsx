import { EnquiryForm } from '@components/forms'
import { Badge } from '@mantine/core'
import { MainLayout } from 'layout'
import Image from 'next/image'

const ContactUs = () => {
  return (
    <MainLayout title="Enquire">
      <section className="w-full bg-slate-50 mb-4 mt-14">
        <div className="relative h-[600px] w-full bg-cover bg-center bg-no-repeat">
          <div className="h-full w-full">
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
        <div className="absolute w-full">
          <div className="container w-full mx-auto -my-80 grid max-w-screen-xl grid-cols-1 gap-4 px-2 md:-my-56 lg:grid-cols-2">
            <div className="flex flex-col px-4 py-8">
              
            </div>
            <EnquiryForm />
          </div>
        </div>
        <div className='h-[400px] bg-slate-50'></div>
      </section>
    </MainLayout>
  )
}

export default ContactUs
