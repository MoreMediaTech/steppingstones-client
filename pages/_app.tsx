import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { NotificationsProvider } from '@mantine/notifications'
import { store, wrapper } from 'app/store'
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from 'react-cookie-consent'
import 'react-quill/dist/quill.snow.css'
import '../styles/globals.css'
import CookieConsentContainer from '@components/CookieConsentContainer'


function MyApp({ Component, pageProps }: AppProps) {
  const [opened, setOpened] = useState<boolean>(false)
  const [isCookieConsent, setIsCookieConsent] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <>
      <Provider store={store}>
        <NotificationsProvider position="top-right">
          <Component {...pageProps} />
        </NotificationsProvider>
      </Provider>
      <CookieConsent
        enableDeclineButton
        flipButtons
        ariaAcceptLabel='Accept cookies'
        ariaDeclineLabel='Decline cookies'
        disableStyles={true}
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        overlayClasses="container max-w-screen-xl mx-auto mb-12"
        buttonClasses="bg-[#5E17EB] hover:bg-[#3A0B99] text-white text-xs sm:text-md px-4 py-2 opacity-100 rounded-full w-full transition-all duration-300 ease-in-out"
        declineButtonClasses="bg-transparent hover:bg-gray-900 hover:text-white text-gray-900 mt-2 border border-gray-900 text-xs sm:text-md px-4 py-2 opacity-100 rounded-full w-full transition-all duration-300 ease-in-out"
        containerClasses="container max-w-screen-lg ml-8 mb-4 bg-white flex flex-col sm:flex-row items-center justify-center p-8 bg-slate-300 fixed bottom-0  w-full rounded-lg "
        contentClasses=" text-gray-900 text-center sm:text-left sm:mr-2 "
        expires={150}
      >
        <div className="space-y-2 p-4">
          <h1 className="text-lg font-semibold">
            Stepping Stones uses cookies to create a better experience for you
          </h1>
          <p className="text-sm text-gray-700">
            Stepping Stones needs your permission to store and access cookies,
            unique identifiers, personal data and information on your browsing
            behaviour on this device. this only applies to
            steppingstonesapp.com. You do not have to accept but some content
            may not work if you don't. click manage preferences to see how we
            use your data.{' '}
            <button type='button' aria-label='Manage Preferences' className="text-[#5E17EB] underline" onClick={() => setOpened(true)}>
              Manage Preferences
            </button>
          </p>
        </div>
      </CookieConsent>
      <CookieConsentContainer opened={opened} checked={checked} setOpened={setOpened} setChecked={setChecked} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
