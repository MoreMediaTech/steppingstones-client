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
          icon={<FaListUl color="#f4900c" />}
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
              icon={<FaListUl color="#f4900c" />}
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
