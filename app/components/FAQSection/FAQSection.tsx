import { faqItems } from 'data'
import FAQItem from './FAQItem'
import { Accordion } from '@components/ui/accordion'

const FAQSection = () => {
  return (
    <section
      id="faqs"
      className=" mx-auto  max-w-screen-xl space-y-4 pb-20 pt-36 "
    >
      <div className="space-y-4 px-2 md:px-0">
        <h1 className="text-center text-3xl font-medium  md:text-4xl">FAQs</h1>
        <h3 className="font-base text-accent-dark-200 text-center md:text-xl">
          Find out what's in store. For more questions, email us at{' '}
          <a href="mailto: info@steppingatonesapp.com">
            info@steppingatonesapp.com
          </a>
        </h3>
      </div>
      <div className="container mx-auto flex flex-col space-y-4 p-2 text-gray-800 dark:text-gray-200">
        <Accordion type="single" collapsible className="w-full space-y-2">

        {faqItems.map((item) => (
          <FAQItem key={item.id} {...item} />
        ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection
