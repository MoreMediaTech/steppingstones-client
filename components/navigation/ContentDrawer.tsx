import { Dispatch, SetStateAction, useState } from 'react'
import {
  UnstyledButton,
  Collapse,
  Drawer,
  Navbar,
  List,
  ScrollArea,
} from '@mantine/core'
import Link from 'next/link'
import { FaListUl, FaRegFile } from 'react-icons/fa'
import { AiOutlineRight } from 'react-icons/ai'
import { RiArrowRightFill } from 'react-icons/ri'
import { MdArrowRight } from 'react-icons/md'

import { contentDrawerSubNavData } from './ContentDrawerData'

const ContentDrawer = ({
  opened,
  setOpened,
  district,
}: {
  opened: boolean
  district: string
  setOpened: Dispatch<SetStateAction<boolean>>
}) => {
  const [optionOne, setOptionOne] = useState(false)
  const [optionTwo, setOptionTwo] = useState(false)
  const [optionThree, setOptionThree] = useState(false)
  const [optionFour, setOptionFour] = useState(false)
  const [optionFive, setOptionFive] = useState(false)
  const [optionSix, setOptionSix] = useState(false)
  const [optionSeven, setOptionSeven] = useState(false)

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
            <div className="flex items-center space-x-4">
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
                <div className="flex items-center space-x-4">
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
                    icon={
                      <div className="flex items-center space-x-4">
                        <span
                          className={`${
                            optionThree
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
                      in={optionTwo}
                      transitionDuration={500}
                      transitionTimingFunction="linear"
                    >
                      {contentDrawerSubNavData?.map((item) => {
                        return (
                          <List.Item key={item.title} className="my-4">
                            <UnstyledButton
                              type="button"
                              onClick={() => setOptionThree((o) => !o)}
                            >
                              {item.title.includes('Why Invest')
                                ? `${item.title} ${district}?`
                                : item.title}
                            </UnstyledButton>
                            <List
                              withPadding
                              listStyleType="disc"
                              center
                              icon={item.listIcon}
                            >
                              <Collapse
                                in={optionThree}
                                transitionDuration={500}
                                transitionTimingFunction="linear"
                              >
                                {item.subNav.map((subItem) => {
                                  return (
                                    <List.Item
                                      key={subItem.title}
                                      className="my-4"
                                    >
                                      <Link href={subItem.path}>
                                        {subItem.title}
                                      </Link>
                                    </List.Item>
                                  )
                                })}
                              </Collapse>
                            </List>
                          </List.Item>
                        )
                      })}
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

{
  /* <List
                      withPadding
                      listStyleType="disc"
                      icon={<FaListUl color="#f4900c" />}
                      styles={{ itemIcon: { marginTop: '5px' } }}
                    >
                      <Collapse
                        in={optionTwo}
                        transitionDuration={500}
                        transitionTimingFunction="linear"
                      >
                        <List.Item className="my-4">
                          <UnstyledButton
                            type="button"
                            onClick={() => setOptionThree((o) => !o)}
                          >
                            Why invest in {district}?
                          </UnstyledButton>
                          <List
                            withPadding
                            listStyleType="disc"
                            center
                            icon={<FaRegFile color="#00dcb3" />}
                          >
                            <Collapse
                              in={optionThree}
                              transitionDuration={500}
                              transitionTimingFunction="linear"
                            >
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>One</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Two</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Three</a>
                                </Link>
                              </List.Item>
                            </Collapse>
                          </List>
                        </List.Item>
                        <List.Item className="my-4">
                          <UnstyledButton
                            type="button"
                            onClick={() => setOptionFour((o) => !o)}
                          >
                            Business News and Information
                          </UnstyledButton>
                          <List
                            withPadding
                            listStyleType="disc"
                            center
                            icon={<FaRegFile color="#00dcb3" />}
                          >
                            <Collapse
                              in={optionFour}
                              transitionDuration={500}
                              transitionTimingFunction="linear"
                            >
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>One</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Two</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Three</a>
                                </Link>
                              </List.Item>
                            </Collapse>
                          </List>
                        </List.Item>
                        <List.Item className="my-4">
                          <UnstyledButton
                            type="button"
                            onClick={() => setOptionFive((o) => !o)}
                          >
                            Support For Start-ups
                          </UnstyledButton>
                          <List
                            withPadding
                            listStyleType="disc"
                            center
                            icon={<FaRegFile color="#00dcb3" />}
                          >
                            <Collapse
                              in={optionFive}
                              transitionDuration={500}
                              transitionTimingFunction="linear"
                            >
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>One</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Two</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Three</a>
                                </Link>
                              </List.Item>
                            </Collapse>
                          </List>
                        </List.Item>
                        <List.Item className="my-4">
                          <UnstyledButton
                            type="button"
                            onClick={() => setOptionSix((o) => !o)}
                            className="ellipsis"
                          >
                            Support for established businesses
                          </UnstyledButton>
                          <List
                            withPadding
                            listStyleType="disc"
                            center
                            icon={<FaRegFile color="#00dcb3" />}
                          >
                            <Collapse
                              in={optionSix}
                              transitionDuration={500}
                              transitionTimingFunction="linear"
                            >
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>One</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Two</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Three</a>
                                </Link>
                              </List.Item>
                            </Collapse>
                          </List>
                        </List.Item>
                        <List.Item className="my-4">
                          <UnstyledButton
                            type="button"
                            onClick={() => setOptionSeven((o) => !o)}
                          >
                            Topical business issues
                          </UnstyledButton>
                          <List
                            withPadding
                            listStyleType="disc"
                            center
                            icon={<FaRegFile color="#00dcb3" />}
                          >
                            <Collapse
                              in={optionSeven}
                              transitionDuration={500}
                              transitionTimingFunction="linear"
                            >
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>One</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Two</a>
                                </Link>
                              </List.Item>
                              <List.Item className="my-4">
                                <Link href={'#'}>
                                  <a>Three</a>
                                </Link>
                              </List.Item>
                            </Collapse>
                          </List>
                        </List.Item>
                      </Collapse>
                    </List> */
}
