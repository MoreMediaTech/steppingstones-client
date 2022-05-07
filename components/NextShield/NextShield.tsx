import React, { ReactNode, useEffect } from 'react'
import { getAccessRoute, verifyPath } from '@lib/routes'
import { NextShieldProps } from '@lib/types'


function NextShield<
  PrivateRoutesList extends string[],
  PublicRoutesList extends string[]
>({
  isAuth,
  isLoading,
  router: { pathname, replace },
  loginRoute,
  accessRoute,
  privateRoutes,
  publicRoutes,
  LoadingComponent,
  RBAC,
  userRole,
  children,
}: NextShieldProps<PrivateRoutesList, PublicRoutesList> & {
  children: ReactNode
}) {
  const pathIsPrivate = verifyPath(privateRoutes, pathname)
  const pathIsPublic = verifyPath(publicRoutes, pathname)
  const pathIsAuthorized =
    RBAC && userRole && verifyPath(RBAC[userRole].grantedRoutes, pathname)
  const access = getAccessRoute(RBAC, userRole, accessRoute)

  useEffect(() => {
    if (!isAuth && !isLoading && pathIsPrivate) replace(loginRoute)
    if (isAuth && !isLoading && pathIsPublic) replace(access)
    if (isAuth && userRole && !isLoading  && !pathIsAuthorized)
      replace(access)
  }, [
    replace,
    userRole,
    access,
    isAuth,
    isLoading,
    loginRoute,
    pathIsPrivate,
    pathIsPublic,
    pathIsAuthorized,
  ])

  if (
    ((isLoading || !isAuth) && pathIsPrivate) ||
    ((isLoading || isAuth) && pathIsPublic) ||
    ((isLoading || userRole) && !pathIsAuthorized )
  )
    return <>{LoadingComponent}</>

  return <>{children}</>
}

export default NextShield;