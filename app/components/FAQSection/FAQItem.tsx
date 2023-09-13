'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'

const FAQItem = (item: { id: number; question: string; answer: string }) => {

  return (
    <AccordionItem
      data-test={`faq-accordion-item-${item.id}`}
      key={`${item.id}`}
      value={`item-${item.id}`}
    >
      <AccordionTrigger data-test={`faq-accordion-trigger-${item.id}`}>
        {item.question}
      </AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
    </AccordionItem>
  )
}

export default FAQItem
