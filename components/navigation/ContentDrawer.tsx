import { Drawer, Navbar } from '@mantine/core'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

const ContentDrawer = ({ opened, setOpened }: {opened: boolean, setOpened: Dispatch<SetStateAction<boolean>>}) => {
  return (
    <Drawer
      aria-labelledby="content-nav-drawer"
      aria-describedby="content-nav-body"
      closeButtonLabel="Close content drawer"
      opened={opened}
      onClose={() => setOpened(false)}
      title={<h1 className='text-xl font-semibold'>Content</h1>}
      padding="xl"
      size="xl"
      position="right"
    >
      
    </Drawer>
  )
}

export default ContentDrawer