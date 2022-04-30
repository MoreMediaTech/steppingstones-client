import { faqItems } from 'data'
import FAQItem from './FAQItem'

const FAQSection = () => {
  
  return (
    <section id="faqs" className=" bg-white space-y-4 pt-24 mb-8">
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-medium text-indigo-900">
          FAQs
        </h1>
        <h3 className="font-base text-center text-xl text-sky-400">
          Find out what's in store. For more questions, email us at{' '}
          <a href="mailto: info@steppingatonesapp.com">
            info@steppingatonesapp.com
          </a>
        </h3>
      </div>
      <div className="container mx-auto flex flex-col p-2 space-y-4">
        {faqItems.map((item) => (
            <FAQItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

export default FAQSection
