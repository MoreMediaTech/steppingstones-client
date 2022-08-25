import React, { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Collapse } from '@mantine/core'

type AccordionProps = {
    children: React.ReactNode
    title: React.ReactNode
}

const Accordion = ({ children, title }: AccordionProps) => {
  const [opened, setOpen] = useState<boolean>(false)
  return (
    <div
      className="flex w-full flex-col space-y-4"
    >
      <button
        type="button"
        className="flex flex-row items-center justify-between"
        onClick={() => setOpen(() => !opened)}
      >
        <>{title}</>
        <span
          className={`${
            opened
              ? 'rotate-90 transition-all duration-200 ease-in-out '
              : 'rotate-0 transition-all duration-200 ease-in-out'
          }`}
        >
          <AiOutlineRight fontSize={18} />
        </span>
      </button>
      <Collapse in={opened} animateOpacity>
        {children}
      </Collapse>
    </div>
  )
}

export default Accordion
