import type { ReactNode } from 'react'
import type { NextRouter } from 'next/router'
export interface IFormData {
  name: string
  email: string
  password?: string
  confirmPassword?: string
  county?: string
  organisation?: string
  postCode?: string 
  contactNumber?: string
  acceptTermsAndConditions?: boolean
  acceptContactRequest?: boolean
}
export type IEmailFormData = {
  from: string
  company: string
  subject: string
  message: string
  html?: string
}

export type SessionProps = {
  id: string
  name: string
  email: string
  isAdmin: boolean
  role: string
}

export type RoleAccess<Routes extends string[]> = {
  [index: string]: {
    grantedRoutes: Routes
    accessRoute: Routes[number]
  }
}

export interface Error {
  message: string
}

export interface CurrentUser {
  id?: string
  name?: string
  email?: string
  isAdmin?: boolean
  role?: string
}

export interface AuthState {
  isAuth: boolean
  currentUser?: CurrentUser | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  token: string
  error: Error | undefined
}

export type PartnerDataProps = {
  id?: string
  title: string
  organisation: string
  description: string
  category: string
  businessType: string
  website: string
  isLive?: boolean
  isHidden?: boolean
  isApproved?: boolean
  status?: string
  areaOfOperation: AreasOfOperation
}
export interface IPartnerState {
  isLoading: boolean
  isSuccess: boolean
  partnerData: PartnerDataProps[]
  isError: boolean
  message: string
  error: Error | undefined
}

export interface IPartnerFormData {
  title: string
  organisation: string
  description: string
  category: string
  businessType: string
  website: string
  areaOfOperation: AreasOfOperation
}


export enum AreasOfOperation { STARTUP = 'STARTUP',
  SMALL_BUSINESS = 'SMALL_BUSINESS',
  GROWING_BUSINESS = 'GROWING_BUSINESS',
  BAME = 'BAME',
  WOMEN_OWNED = 'WOMEN_OWNED',
  ENTERPRISE = 'ENTERPRISE',
  OTHER = 'OTHER'
}

export interface Children {
  children: ReactNode
}

export type ComponentShieldBaseProps = Children & { RBAC?: never; showIf?: never }

export type ComponentShieldRBACProps = Children & {
  RBAC: true
  showForRole: string[] | string
  userRole: string | null
}

export type ComponentShieldAuthProps = Children & {
  RBAC?: never
  showIf: boolean
  fallback?: ReactNode
}

export type ComponentShieldProps = Children & {
  RBAC?: boolean
  userRole?: string | null
  showForRole?: string[] | string
  showIf?: boolean
  fallback?: ReactNode
}

export type NextShieldProps<
  PrivateRoutesList extends string[],
  PublicRoutesList extends string[]
> =
  | {
      
      isAuth: boolean
      isLoading: boolean
      router: NextRouter
      loginRoute: PublicRoutesList[number]
      accessRoute: PrivateRoutesList[number]
      privateRoutes: PrivateRoutesList
      publicRoutes: PublicRoutesList
      hybridRoutes?: string[]
      LoadingComponent: ReactNode
      RBAC?: never
      userRole?: never
    }
  | {
      isAuth: boolean
      isLoading: boolean
      router: NextRouter
      loginRoute: PublicRoutesList[number]
      accessRoute?: never
      privateRoutes: PrivateRoutesList
      publicRoutes: PublicRoutesList
      hybridRoutes?: string[]
      LoadingComponent: ReactNode
      RBAC: RoleAccess<PrivateRoutesList[number][]>
      userRole: string | undefined
    }
