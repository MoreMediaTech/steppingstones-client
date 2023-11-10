'use client'
import { useState } from 'react'

import { OPTIONS, SAME_SITE_OPTIONS, VISIBLE_OPTIONS } from '@lib/types'
import CookieConsent from './CookieConsent'
import CookieConsentContainer from './CookieConsentContainer'

import { useAppDispatch} from 'app/global-state/hooks'
import {
  setIsVisible,
} from 'app/global-state/features/global/globalSlice'
import { setCookie } from './actions'


const CookieConsentComponent = () => {
  const dispatch = useAppDispatch()
  const [opened, setOpened] = useState<boolean>(false)
  const [snCookies, setSNCookies] = useState<boolean>(false)
  const [pAndACookies, setPAndACookies] = useState<boolean>(false)

  // default cookie name
  const COOKIE_NAME = 'ssapp-cookie-consent'
  const COOKIE_CONSENT = "ssapp-strictly-necessary-cookie-consent"

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
    dispatch(setIsVisible(false))
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
      setCookie(
        COOKIE_CONSENT,
        false,
        0,
        { domain: "steppingstonesapp.com" },
        true,
        SAME_SITE_OPTIONS.LAX
      );
    setOpened(false)
    setSNCookies(true)
    setPAndACookies(true)
    dispatch(setIsVisible(false))
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
     setCookie(
       COOKIE_CONSENT,
       true,
       0,
       { domain: "steppingstonesapp.com" },
       true,
       SAME_SITE_OPTIONS.LAX
     );
    dispatch(setIsVisible(false))
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
      setCookie(
        COOKIE_CONSENT,
        false,
        0,
        { domain: "steppingstonesapp.com" },
        true,
        SAME_SITE_OPTIONS.LAX
      );
    dispatch(setIsVisible(false))

    setOpened(false)
  }

  return (
    <>
      <CookieConsent
        enableDeclineButton
        flipButtons
        cookieName={COOKIE_NAME}
        visible={VISIBLE_OPTIONS.BY_COOKIE_VALUE}
        ariaAcceptLabel="Accept cookies"
        ariaDeclineLabel="Decline cookies"
        disableStyles={true}
        location={OPTIONS.BOTTOM}
        buttonText="Accept"
        declineButtonText="Decline"
        buttonClasses=" text-xs sm:text-md px-4 py-2 rounded w-full transition-all duration-300 ease-in-out"
        declineButtonClasses="border-primary mt-2 text-xs text-primary sm:text-md px-4 py-2 rounded w-full "
        containerClasses="md:container md:max-w-screen-sm !mx-2 md:mx-0 md:ml-8 mb-4 flex flex-col md:flex-row items-center justify-center py-2 md:p-8 border-foreground border-2 bg-background text-primary fixed bottom-0  md:w-full rounded-lg"
        contentClasses=" text-center sm:text-left sm:mr-2 text-primary"
        expires={150}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
      >
        <div className="space-y-2 p-4">
          <h1 className="text-justify text-base font-semibold md:text-lg">
            Stepping Stones uses cookies to create a better experience for you
          </h1>
          <p className="text-justify text-sm text-gray-700 dark:text-gray-300">
            Stepping Stones needs your permission to store and access cookies,
            unique identifiers, personal data and information on your browsing
            behaviour on this device. this only applies to
            steppingstonesapp.com. You do not have to accept but some content
            may not work if you don't. click manage preferences to see how we
            use your data.{" "}
          </p>
          <CookieConsentContainer
            snCookies={snCookies}
            setSNCookies={setSNCookies}
            handleAccept={handleAcceptAll}
            handleConfirmChoices={handleConfirmChoices}
          />
        </div>
      </CookieConsent>
    </>
  );
}

export default CookieConsentComponent
