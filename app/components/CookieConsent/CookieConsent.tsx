'use client'
import { useEffect } from 'react'
import { CookieConsentProps, OPTIONS } from '@lib/types'

import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import { setIsVisible, globalSelector } from 'app/global-state/features/global/globalSlice'
import { getCookieConsentValue, setCookie } from './actions'




export default function CookieConsent ({
  children,
  containerClasses,
  cookieName,
  handleDecline,
  handleAccept,
  debug,
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
}: Partial<CookieConsentProps>){
  const dispatch = useAppDispatch()
  const { isVisible } = useAppSelector(globalSelector)

  useEffect(() => {
    function watchScroll() {
      // if cookie undefined or debug
      if (!isVisible) {
        setCookie('ssapp-cookie-consent', false)
        dispatch(setIsVisible(true))
      } else {
        setCookie('ssapp-cookie-consent', true)
        dispatch(setIsVisible(false))
      }
    }
    watchScroll()
  }, [])

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

