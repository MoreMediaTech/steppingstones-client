import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import{ motion }from 'framer-motion'

import { useLogoutMutation } from 'features/auth/authApiSlice'
import { AdminSidebar } from '@components/navigation'
import { NEXT_URL } from '@config/index'
import { Children } from '@lib/types'
interface ILayout extends Children {
  title?: string
  description?: string
  show?: boolean
  children: React.ReactNode
}

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

// {
//   hidden: { opacity: 0, x: -200, y: 0 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 0, x: 0, y: -100 },
// }

const AdminLayout = ({
  title,
  description,
  show,
  children,
}: ILayout): JSX.Element => {
  const router = useRouter()
  const [logout] = useLogoutMutation()
  const [isOpen, setIsOpen] = useState(false)
 
  const handleLogout = async () => {
    logout()
    localStorage.removeItem('token')
    router.replace(`${NEXT_URL}`)
  }

  return (
    <div
      className="flex flex-col md:flex-row"
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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminSidebar
        handleLogout={handleLogout}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <motion.main
        variants={variants} // Pass the variant object into Framer Motion
        initial="initial" // Set the initial state to variants.hidden
        animate="animate" // Animated state to variants.enter
        className={`md:ml-30
        relative w-full bg-slate-50`}
      >
        {children}
      </motion.main>
    </div>
  )
}

export default AdminLayout
