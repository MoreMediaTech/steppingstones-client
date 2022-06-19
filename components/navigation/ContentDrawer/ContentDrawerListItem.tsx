import { useState } from 'react'
import Link from 'next/link'
import { Collapse, List, UnstyledButton } from '@mantine/core'
import { DistrictDataProps, IContentDrawerSubNavData } from '@lib/types'

const ContentDrawerItem = ({
  item,
  district,
  districtData,
}: {
  item: IContentDrawerSubNavData
  district: string
  districtData: DistrictDataProps
}) => {
  const [opened, setOpened] = useState(false)
  return (
    <List.Item
      key={item.title}
      className="my-4"
      icon={
        <div className="-ml-8 flex items-center space-x-1">
          {item.subNav.length > 0 ? (
            <span
              className={`${
                opened
                  ? 'rotate-90 transition-all duration-500 ease-in-out '
                  : 'rotate-0 transition-all duration-500 ease-in-out'
              }`}
            >
              {item.subNav.length > 0 && item.iconOpenClosed}
            </span>
          ) : (
            item.iconOpenClosed
          )}
          {item.icon}
        </div>
      }
    >
      <Link
        href={{
          pathname: `${item.path}`,
          query: { district: `${district}`, id: `${districtData.id}` },
        }}
      >
        <a onClick={() => setOpened((o) => !o)}>
          {item.title.includes('Why Invest')
            ? `${item.title} ${district}?`
            : item.title}
        </a>
      </Link>
      <List withPadding listStyleType="disc" center icon={item.listIcon}>
        <Collapse
          in={opened}
          transitionDuration={500}
          transitionTimingFunction="linear"
        >
          {item.subNav.map((subItem) => {
            return (
              <List.Item key={subItem.title} className="my-4">
                <Link
                  href={{
                    pathname: subItem.path,
                    query: {
                      district: `${district}`,
                      id: `${districtData.id}`,
                    },
                  }}
                >
                  <a>{subItem.title}</a>
                </Link>
              </List.Item>
            )
          })}
        </Collapse>
      </List>
    </List.Item>
  )
}

export default ContentDrawerItem
