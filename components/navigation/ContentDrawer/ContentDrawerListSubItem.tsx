import { useState } from 'react'
import Link from 'next/link'
import { Collapse, List, UnstyledButton } from '@mantine/core'

type ItemsProps = {
  title: string
  path: string
  listIcon: JSX.Element
  iconOpenClosed?: JSX.Element
  subNavTwo: {
    title: string
    path: string
  }[]
}

const ContentDrawerListSubItem = (items: ItemsProps)  => {
    const [opened, setOpened] = useState(false)
  return (
    <List.Item
      key={items.title}
      className="my-4"
      icon={
        <div className="-ml-8 flex items-center space-x-1">
          {items?.subNavTwo?.length > 0 ? (
            <span
              className={`${
                opened
                  ? 'rotate-90 transition-all duration-500 ease-in-out '
                  : 'rotate-0 transition-all duration-500 ease-in-out'
              }`}
            >
              {items.subNavTwo.length > 0 && items.iconOpenClosed}
            </span>
          ) : (
            items.iconOpenClosed
          )}
          {items.listIcon}
        </div>
      }
    >
      <UnstyledButton type="button" onClick={() => setOpened((o) => !o)}>
        {items.title}
      </UnstyledButton>
      <List withPadding listStyleType="disc" center icon={items.listIcon}>
        <Collapse
          in={opened}
          transitionDuration={500}
          transitionTimingFunction="linear"
        >
          {items.subNavTwo.map((subItem) => {
            return (
              <List.Item key={subItem.title} className="my-4">
                <Link href={subItem.path}>{subItem.title}</Link>
              </List.Item>
            )
          })}
        </Collapse>
      </List>
    </List.Item>
  )
}

export default ContentDrawerListSubItem
