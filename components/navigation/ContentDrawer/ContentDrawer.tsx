import { Dispatch, SetStateAction, useState } from 'react'
import { UnstyledButton, Collapse, Drawer, List } from '@mantine/core'

import { FaListUl } from 'react-icons/fa'
import { MdArrowRight } from 'react-icons/md'

import { contentDrawerSubNavData } from './ContentDrawerData'
import ContentDrawerItem from './ContentDrawerListItem'
import { CountyDataProps } from '@lib/types'

const ContentDrawer = ({
  opened,
  setOpened,
  countyData,
}: {
  opened: boolean
  countyData: CountyDataProps
  setOpened: Dispatch<SetStateAction<boolean>>
}) => {
  const [optionOne, setOptionOne] = useState(false)
  const [optionTwo, setOptionTwo] = useState(false)

  return (
    <Drawer
      aria-labelledby="content-nav-drawer"
      aria-describedby="content-nav-body"
      closeButtonLabel="Close content drawer"
      opened={opened}
      onClose={() => setOpened(false)}
      title={<h1 className="text-xl font-semibold">Content</h1>}
      padding="xl"
      size="xl"
      position="right"
    >
      <nav className="touch-auto overflow-auto py-4">
        <List
          spacing="xs"
          size="sm"
          icon={
            <div className="flex items-center space-x-1">
              <span
                className={`${
                  optionOne
                    ? 'rotate-90 transition-all duration-500 ease-in-out '
                    : 'rotate-0 transition-all duration-500 ease-in-out'
                }`}
              >
                <MdArrowRight fontSize={18} />
              </span>
              <FaListUl color="#f4900c" />
            </div>
          }
          styles={{ itemIcon: { marginTop: '5px' } }}
        >
          <List.Item>
            <UnstyledButton
              type="button"
              onClick={() => setOptionOne((o) => !o)}
            >
              Business & Licensing
            </UnstyledButton>
            <List
              withPadding
              listStyleType="disc"
              icon={
                <div className="-ml-8 flex items-center space-x-1">
                  <span
                    className={`${
                      optionTwo
                        ? 'rotate-90 transition-all duration-500 ease-in-out '
                        : 'rotate-0 transition-all duration-500 ease-in-out'
                    }`}
                  >
                    <MdArrowRight fontSize={18} />
                  </span>
                  <FaListUl color="#f4900c" />
                </div>
              }
              styles={{ itemIcon: { marginTop: '5px' } }}
            >
              <Collapse
                in={optionOne}
                transitionDuration={500}
                transitionTimingFunction="linear"
              >
                <List.Item className="my-4">
                  <UnstyledButton
                    type="button"
                    onClick={() => setOptionTwo((o) => !o)}
                    className="pb-2"
                  >
                    Business Support
                  </UnstyledButton>
                  <List
                    withPadding
                    listStyleType="disc"
                    styles={{ itemIcon: { marginTop: '5px' } }}
                  >
                    <Collapse
                      in={optionTwo}
                      transitionDuration={500}
                      transitionTimingFunction="linear"
                    >
                      {contentDrawerSubNavData?.map((item, index) => (
                        <ContentDrawerItem
                          key={`${item}-${index}`}
                          item={item}
                          countyData={countyData}
                        />
                      ))}
                    </Collapse>
                  </List>
                </List.Item>
              </Collapse>
            </List>
          </List.Item>
        </List>
      </nav>
    </Drawer>
  )
}

export default ContentDrawer
