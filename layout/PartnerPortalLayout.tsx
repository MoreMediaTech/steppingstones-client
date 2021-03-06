import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  AppShell,
  useMantineTheme,
} from '@mantine/core'
import Head from 'next/head'
import { CgMenuGridR } from 'react-icons/cg'



import { useLogoutMutation } from 'features/auth/authApiSlice'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import { AdminNavbar, AdminSidebar } from '@components/navigation'
import { NEXT_URL } from '@config/index'
import { Children } from '@lib/types'
interface ILayout extends Children {
  title?: string
  description?: string
  showSidebar?: boolean
}

const PartnerPortalLayout = ({ title, description, children }: ILayout) => {
    const router = useRouter()
      const { data: currentUser } = useGetUserQuery()
      const [logout] = useLogoutMutation()
    const theme = useMantineTheme()
    const [opened, setOpened] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

   const handleLogout = () => {
     logout()
     localStorage.removeItem('token')
     router.replace(`${NEXT_URL}`)
   }

   return (
     <div
       className="flex h-screen flex-col justify-between"
       aria-label="layout"
       data-testid="layout"
     >
       <Head>
         <title>{title} | Stepping Stones</title>
         <link rel="icon" href="/favicon.ico" />
         <link
           rel="apple-touch-icon"
           sizes="180x180"
           href="/apple-touch-icon.png"
         />
         <link
           rel="icon"
           type="image/png"
           sizes="32x32"
           href="/favicon-32x32.png"
         />
         <link
           rel="icon"
           type="image/png"
           sizes="16x16"
           href="/favicon-16x16.png"
         />
         <link rel="manifest" href="/site.webmanifest" />
         <meta charSet="utf-8" />
         <meta name="description" content={description} />
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="application-name" content="Stepping Stones" />
         <meta name="apple-mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-status-bar-style" content="default" />
         <meta name="apple-mobile-web-app-title" content="Stepping Stones" />
         <meta name="description" content={description} />
         <meta name="format-detection" content="telephone=no" />
         <meta name="mobile-web-app-capable" content="yes" />
         <meta property="og:type" content="website" />
         <meta property="og:title" content={`${title} | Stepping Stones`} />
         <meta property="og:description" content={description} />
         <meta property="og:site_name" content="Stepping Stones" />
         <meta property="og:url" content="" />
         <meta name="theme-color" content="#000000" />
         <meta
           name="viewport"
           content="initial-scale=1.0, width=device-width"
         />
       </Head>
       <AppShell
         styles={{
           main: {
             background:
               theme.colorScheme === 'dark'
                 ? theme.colors.dark[8]
                 : theme.colors.gray[0],
           },
         }}
         navbarOffsetBreakpoint="md"
         asideOffsetBreakpoint="sm"
         fixed
         navbar={<AdminSidebar show setIsOpen={setIsOpen} />}
         header={
           <AdminNavbar
             opened={opened}
             setOpened={setOpened}
             theme={theme}
             handleLogout={handleLogout}
           />
         }
       >
         {children}
       </AppShell>
     </div>
   )
}

export default PartnerPortalLayout
