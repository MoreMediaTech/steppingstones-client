'use client';
import { useState } from 'react'
// import { AiOutlineRight } from 'react-icons/ai'
// import { Collapse } from '@mantine/core'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'

const FAQItem = (item: { id: number; question: string; answer: string }) => {
    const [opened, setOpen] = useState<boolean>(false)
  return (
    <>
      <AccordionItem key={`${item.id}`} value={`item-${item.id}`}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
      {/* <div
        key={`${item.id}`}
        className="flex w-full flex-col space-y-4 rounded-md border border-gray-300 p-6"
      >
        <button
          type="button"
          className="flex flex-row items-center justify-between"
          onClick={() => setOpen(() => !opened)}
        >
          <h3 className="text-gray-700 dark:text-gray-100">{item.question}</h3>
          <span
            className={`${
              opened
                ? 'rotate-90 transition-all duration-150 ease-in-out '
                : 'rotate-0 transition-all duration-150 ease-in-out'
            }`}
          >
            <AiOutlineRight fontSize={18} />
          </span>
        </button>
        <Collapse in={opened} animateOpacity>
          <p className="text-gray-500 dark:text-gray-300">{item.answer}</p>
        </Collapse>
      </div> */}
    </>
  )
}

export default FAQItem
