'use server'
import { SAME_SITE_OPTIONS } from "@lib/types"
import { cookies } from "next/headers"

/**
 * Get the legacy cookie name by the regular cookie name
 * @param {string} name of cookie to get
 */
function getLegacyCookieName (name: string) {
  return `${name}-legacy`
}


/**
 * Returns the value of the consent cookie
 * Retrieves the regular value first and if not found the legacy one according
 * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
 * @param {*} name optional name of the cookie
 */
export async function getCookieConsentValue(name: string) {
  const cookieStore = cookies()
  const cookieValue = cookieStore.get(name)

  // if the cookieValue is undefined check for the legacy cookie
  if (cookieValue === undefined) {
    return cookieStore.get(getLegacyCookieName(name))
  }
  return cookieValue
}

/**
 * Reset the consent cookie
 * Remove the cookie on browser in order to allow user to change their consent
 * @param {*} name optional name of the cookie
 */
export async function resetCookieConsentValue(name: string){
  cookies().set({
    name: name,
    value: 'false',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })
}

export async function setCookie(
  cookieName: string,
  cookieValue: string | boolean | object | number,
  maxAge?: number,
  extraCookieOptions?: object,
  cookieSecurity?: boolean,
  sameSite?: SAME_SITE_OPTIONS
) {
  const cookieStore = cookies()
  const cookieOptions = {
    maxAge,
    ...extraCookieOptions,
    sameSite,
    secure: cookieSecurity,
  }

  cookieStore.set(cookieName, JSON.stringify(cookieValue))
}

export async function checkCookieConsent () {
  const cookieOptions = cookies()
  const cookie = cookieOptions.get('ssapp-cookie-consent')
  if (!cookie || cookie === undefined) {
    return true
  }
  return false
}
