import { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Collapse } from '@mantine/core'

const FAQItem = (item: { id: number; question: string; answer: string }) => {
    const [opened, setOpen] = useState<boolean>(false)
  return (
    <div
      key={`${item.id}`}
      className="flex w-full flex-col space-y-4 rounded-md border border-gray-200 p-6"
    >
      <button
        type="button"
        className="flex flex-row items-center justify-between"
        onClick={() => setOpen(() => !opened)}
      >
        <h3>{item.question}</h3>
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
        <p className="text-gray-300">{item.answer}</p>
      </Collapse>
    </div>
  )
}

export default FAQItem
