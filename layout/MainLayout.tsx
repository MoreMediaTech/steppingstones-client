import Head from 'next/head'
import { Navbar } from '@components/navigation';
import { useRouter } from 'next/router';
import Footer from '@components/footer';
import {
  AppShell,
  useMantineTheme,
} from '@mantine/core'

interface ILayout {
  title?: string
  description?: string
  children: React.ReactNode
}

function MainLayout({ title, description, children }: ILayout): JSX.Element {
  const router = useRouter();
    const theme = useMantineTheme()
  return (
    <main
      aria-label="layout"
      data-testid="layout"
      className="relative flex flex-col justify-between h-screen"
    >
      <Head>
        <title>{`${title} | Stepping Stones App`}</title>
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
        <meta name="application-name" content="Stepping Stones App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Stepping Stones App" />
        <meta name="description" content={description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} | Stepping Stones App`} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Stepping Stones App" />
        <meta property="og:url" content="" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar />
      <main
        className={`w-full flex-grow bg-primary-light-100 dark:bg-primary-dark-800 relative  z-0 `}
      >
        {children}
      </main>
      <Footer />
    </main>
  )
}

export default MainLayout
