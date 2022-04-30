import React from 'react'
import { Navbar } from '@mantine/core'

const AdminNavbar = ({opened}: {opened: boolean}) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      
    </Navbar>
  )
}

export default AdminNavbar
