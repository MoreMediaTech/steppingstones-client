import { useState } from 'react'
import Cookies from 'js-cookie'
import { OPTIONS, SAME_SITE_OPTIONS, VISIBLE_OPTIONS } from '@lib/types'
import CookieConsent from './CookieConsent'
import CookieConsentContainer from './CookieConsentContainer'

 function setCookie(
   cookieName: string,
   cookieValue: string | boolean | object | number,
   maxAge: number,
   extraCookieOptions: object,
   cookieSecurity: boolean,
   sameSite: SAME_SITE_OPTIONS
 ) {
   const cookieOptions = {
     maxAge,
     ...extraCookieOptions,
     sameSite,
     secure: cookieSecurity,
   }

   Cookies.set(cookieName, JSON.stringify(cookieValue), cookieOptions)
 }

const CookieConsentComponent = () => {
    const [opened, setOpened] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [snCookies, setSNCookies] = useState<boolean>(false)
    const [pAndACookies, setPAndACookies] = useState<boolean>(false)

    // default cookie name
    const COOKIE_NAME = 'ssapp-cookie-consent'

    /**
     * @description - This function is used to set the cookie consent cookie.
     */
    const handleAccept = () => {
      setCookie(
        COOKIE_NAME,
        true,
        150,
        { domain: 'steppingstonesapp.com' },
        true,
        SAME_SITE_OPTIONS.LAX
      )
      setIsVisible(false)
    }

    /**
     * @description - function to handle the user accepting all cookies
     */
    const handleAcceptAll = () => {
      setCookie(
        COOKIE_NAME,
        {
          'strictly-necessary-cookies': true,
          'performance-and-analytics-cookies': true,
        },
        150,
        { domain: 'steppingstonesapp.com' },
        true,
        SAME_SITE_OPTIONS.LAX
      )
      setOpened(false)
      setSNCookies(true)
      setPAndACookies(true)
      setIsVisible(false)
    }

    /**
     * @description - function to handle the user declining the cookies.
     */
    const handleDecline = () => {
      setCookie(
        COOKIE_NAME,
        false,
        0,
        { domain: 'steppingstonesapp.com' },
        true,
        SAME_SITE_OPTIONS.LAX
      )
      setIsVisible(false)
    }

    /**
     * @description - function to handle/confirm the user cookie options
     */
    const handleConfirmChoices = () => {
      setCookie(
        'ssapp-strictly-necessary-cookie-consent',
        {
          'strictly-necessary-cookies': snCookies ? true : false,
          'performance-and-analytics-cookies': pAndACookies ? true : false,
        },
        150,
        { domain: 'steppingstonesapp.com' },
        true,
        SAME_SITE_OPTIONS.LAX
      )
      setIsVisible(false)
      setOpened(false)
    }

  return (
    <>
      <CookieConsent
        enableDeclineButton
        flipButtons
        cookieName={COOKIE_NAME}
        visible={VISIBLE_OPTIONS.BY_COOKIE_VALUE}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        ariaAcceptLabel="Accept cookies"
        ariaDeclineLabel="Decline cookies"
        disableStyles={true}
        location={OPTIONS.BOTTOM}
        buttonText="Accept"
        declineButtonText="Decline"
        buttonClasses="bg-[#5E17EB] hover:bg-[#3A0B99] text-white text-xs sm:text-md px-4 py-2 opacity-100 rounded-full w-full transition-all duration-300 ease-in-out"
        declineButtonClasses="bg-transparent hover:bg-gray-900 hover:text-white text-gray-900 mt-2 border border-gray-900 text-xs sm:text-md px-4 py-2 opacity-100 rounded-full w-full "
        containerClasses="md:container md:max-w-screen-lg !mx-2 md:mx-0 md:ml-8 mb-4 flex flex-col md:flex-row items-center justify-center py-2 md:p-8 bg-slate-300 fixed bottom-0  md:w-full rounded-lg"
        contentClasses=" text-gray-900 text-center sm:text-left sm:mr-2 "
        expires={150}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
      >
        <div className="space-y-2 p-4">
          <h1 className="text-justify text-base font-semibold md:text-lg">
            Stepping Stones uses cookies to create a better experience for you
          </h1>
          <p className="text-justify text-sm text-gray-700">
            Stepping Stones needs your permission to store and access cookies,
            unique identifiers, personal data and information on your browsing
            behaviour on this device. this only applies to
            steppingstonesapp.com. You do not have to accept but some content
            may not work if you don't. click manage preferences to see how we
            use your data.{' '}
            <button
              type="button"
              aria-label="Manage Preferences"
              className="text-[#5E17EB] underline"
              onClick={() => setOpened(true)}
            >
              Manage Preferences
            </button>
          </p>
        </div>
      </CookieConsent>
      <CookieConsentContainer
        opened={opened}
        snCookies={snCookies}
        setOpened={setOpened}
        setSNCookies={setSNCookies}
        handleAccept={handleAcceptAll}
        handleConfirmChoices={handleConfirmChoices}
      />
    </>
  )
}

export default CookieConsentComponent
