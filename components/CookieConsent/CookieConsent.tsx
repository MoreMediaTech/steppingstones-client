'use client'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { CookieConsentProps, OPTIONS } from '@lib/types'

import { useAppDispatch } from 'app/global-state/hooks'
import { setIsVisible } from 'app/global-state/features/global/globalSlice'

/**
 * Returns the value of the consent cookie
 * Retrieves the regular value first and if not found the legacy one according
 * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
 * @param {*} name optional name of the cookie
 */
export const getCookieConsentValue = (name: string) => {
  const cookieValue: string = Cookies.get(name) as string

  // if the cookieValue is undefined check for the legacy cookie
  if (cookieValue === undefined) {
    return Cookies.get(getLegacyCookieName(name))
  }
  return JSON.parse(cookieValue)
}

/**
 * Reset the consent cookie
 * Remove the cookie on browser in order to allow user to change their consent
 * @param {*} name optional name of the cookie
 */
export const resetCookieConsentValue = (name: string) => {
  Cookies.remove(name)
}

/**
 * Get the legacy cookie name by the regular cookie name
 * @param {string} name of cookie to get
 */
const getLegacyCookieName = (name: string) => {
  return `${name}-legacy`
}

const CookieConsent = ({
  children,
  containerClasses,
  cookieName,
  handleDecline,
  handleAccept,
  debug,
  isVisible,
  customContainerAttributes,
  enableDeclineButton,
  declineButtonClasses,
  declineButtonText,
  buttonClasses,
  buttonText,
  ariaAcceptLabel,
  ariaDeclineLabel,
  buttonId,
  declineButtonId,
  customButtonProps,
  customDeclineButtonProps,
  flipButtons,
  contentClasses,
  customContentAttributes,
  buttonWrapperClasses,
}: Partial<CookieConsentProps>) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    function watchScroll() {
      // if cookie undefined or debug
      if (!getCookieValue() || getCookieValue() === undefined || debug) {
        dispatch(setIsVisible(true))
      } else {
        dispatch(setIsVisible(false))
      }
    }
    watchScroll()
  }, [])

  /**
   * Returns the value of the consent cookie
   * Retrieves the regular value first and if not found the legacy one according
   * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
  function getCookieValue() {
    return getCookieConsentValue(cookieName as string)
  }

  const buttonsToRender = []

  // add decline button
  enableDeclineButton &&
    buttonsToRender.push(
      <button
        key="declineButton"
        className={`${declineButtonClasses} ${styles.declineButtonStyle}`}
        id={declineButtonId}
        aria-label={ariaDeclineLabel}
        onClick={handleDecline}
        {...customDeclineButtonProps}
      >
        {declineButtonText}
      </button>
    )

  // add accept button
  buttonsToRender.push(
    <button
      key="acceptButton"
      className={`${buttonClasses} ${styles.buttonStyle}`}
      id={buttonId}
      aria-label={ariaAcceptLabel}
      onClick={handleAccept}
      {...customButtonProps}
    >
      {buttonText}
    </button>
  )

  if (flipButtons) {
    buttonsToRender.reverse()
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`${
        OPTIONS.TOP ? 'top-0' : OPTIONS.BOTTOM ? 'bottom-0' : ''
      }${containerClasses} ${styles.style}`}
      {...customContainerAttributes}
    >
      <div
        className={`${contentClasses} ${styles.contentStyle}`}
        {...customContentAttributes}
      >
        {children}
      </div>
      <div className={`${buttonWrapperClasses}`}>
        {buttonsToRender.map((button) => {
          return button
        })}
      </div>
    </div>
  )
}

const styles = {
  style: 'items-center text-white justify-between left-0 z-10',
  buttonStyle:
    ' border-0 border-radius-0 shadow-none  cursor-pointer flex-initial',
  declineButtonStyle: ' cursor-pointer flex-initial ',
  contentStyle: 'flex m-4',
}

export default CookieConsent
