import type { ReactNode } from 'react'
import type { NextRouter } from 'next/router'

export interface IFormData {
  name: string
  email: string
  password: string
  newPassword: string
  confirmPassword: string
  role: string
  isAdmin: boolean
  emailVerified: boolean
  acceptTermsAndConditions: boolean
  county: string
  district: string
  contactNumber: string
  postCode: string
  imageUrl: string
  acceptContactRequest: boolean
  organisation: string
  published: boolean
  isLive: boolean
  id?: string
  partner?: string
  description: string
  category: string
  businessType: string
  website: string
  isHidden?: boolean
  isApproved?: boolean
  status?: Status
  areaOfOperation: AreasOfOperation
  valueCategory: ValueCategory
  partnerType: PartnerType
  projectsResponsibleFor: string
  closingDate: Date
  isEmail: boolean
  position: string
  createdAt: string
  updatedAt: string
}

export interface MessageProps {
  id: string
  from: string
  to: string
  subject: string
  company: string
  html: string
  message: string
  createdAt: string
  updatedAt: string
  isRead: boolean
}

export enum ROLE {
  PARTNER = 'PARTNER',
  COUNTY_EDITOR = 'COUNTY_EDITOR',
  SS_EDITOR = 'SS_EDITOR',
  USER = 'USER',
}

export enum OPTIONS {
  TOP = 'top',
  BOTTOM = 'bottom',
  NONE = 'none',
  LOCATION = 'location',
}

export enum SAME_SITE_OPTIONS {
  STRICT = 'strict',
  LAX = 'lax',
  NONE = 'none',
}

export enum VISIBLE_OPTIONS {
  HIDDEN = 'hidden',
  SHOW = 'show',
  BY_COOKIE_VALUE = 'byCookieValue',
}

export enum Status {
  LIVE = 'LIVE',
  ONHOLD = 'ONHOLD',
  CLOSED = 'CLOSED',
  HIDDEN = 'HIDDEN',
}

export enum PartnerType {
  NONE ='NONE',
  PARTNER = 'PARTNER',
  LEAD_PARTNER = 'LEAD_PARTNER',
  SENIOR_CONTACT = 'SENIOR_CONTACT',
}

export enum ValueCategory {
  NONE = 'NONE',
  CREATIVE_DIGITAL = 'CREATIVE DIGITAL',
  DIGITAL= 'DIGITAL',
  EMPLOYMENT = 'EMPLOYMENT',
  FINANCIAL = 'FINANCIAL',
  GLOBAL_TRADING = 'GLOBAL TRADING',
  GREEN_ENERGY = 'GREEN ENERGY',
  INNOVATION = 'INNOVATION',
  MARKETING = 'MARKETING',
  MENTAL_HEALTH = 'MENTAL HEALTH',
  NETWORKING = 'NETWORKING',
  SECTOR_GROWTH = 'SECTOR GROWTH',
  STARTUP = 'STARTUP',
  STEM_SECTORS = 'STEM SECTORS',
  TALENT = 'TALENT',
  TRADE_ASSOCIATIONS = 'TRADE ASSOCIATIONS',
  TRAINING = 'TRAINING',
  VISITOR_ECONOMY = 'VISITOR ECONOMY',
}

export interface CookieConsentProps {
  location: OPTIONS
  visible: VISIBLE_OPTIONS
  isVisible: boolean
  sameSite: SAME_SITE_OPTIONS
  consentStyle: string
  buttonStyle: string
  declineButtonStyle: string
  contentStyle: string
  children: ReactNode // eslint-disable-line react/forbid-prop-types
  disableStyles: boolean
  hideOnAccept: boolean
  hideOnDecline: boolean
  accept: boolean
  decline: boolean
  handleAccept(): void
  handleDecline(): void
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  setAccept: React.Dispatch<React.SetStateAction<boolean>>
  setDecline: React.Dispatch<React.SetStateAction<boolean>>
  buttonText: string | ReactNode
  declineButtonText: string | ReactNode
  cookieName: string
  cookieValue: string | boolean | number
  declineCookieValue: string | boolean | number
  setDeclineCookie: boolean
  debug: boolean
  expires: number
  containerClasses: string
  contentClasses: string
  buttonClasses: string
  buttonWrapperClasses: string
  declineButtonClasses: string
  buttonId: string
  declineButtonId: string
  extraCookieOptions: object
  disableButtonStyles: boolean
  enableDeclineButton: boolean
  flipButtons: boolean
  ButtonComponent: ReactNode
  cookieSecurity: boolean
  overlay: boolean
  overlayClasses: string
  overlayStyle: object
  onOverlayClick(): void
  acceptOnOverlayClick: boolean
  ariaAcceptLabel: string
  ariaDeclineLabel: string
  acceptOnScroll: boolean
  acceptOnScrollPercentage: number
  customContentAttributes: object
  customContainerAttributes: object
  customButtonProps: object
  customDeclineButtonProps: object
}

export type EditImageProps = {
  imageFile: FileList
}

export type EditorFormDataProps = {
  intro: string
  title: string
  imageUrl?: string | FileList | ArrayBuffer 
  imageFile: FileList
  content: string
  isLive: boolean
}
export interface IContentDrawerSubNavData {
  title: string
  path?: string
  subPath?: string
  path2?: string
  subPath2?: string
  icon: JSX.Element
  listIcon: JSX.Element
  iconOpenClosed: JSX.Element
  subNav: {
    title: string
    path?: string
    subPath?: string
    listIcon?: JSX.Element
    iconOpenClosed?: JSX.Element
    subNavTwo?: {
      title: string
      path?: string
      subPath?: string
    }[]
  }[]
}

export type SectionProps = {
  id: string
  name: string
  title?: string
  content?: string
  imageUrl?: string
  isSubSection?: boolean
  isLive?: boolean
  subsections?: SubSectionProps[]
  createdAt?: string
  updatedAt?: string
  county?: CountyDataProps
}

export type DistrictSectionProps = {
  id: string
  name: string
  title?: string
  content?: string
  imageUrl?: string
  isEconomicData?: boolean
  isLive?: boolean
  economicDataWidgets: EconomicDataWidgetProps[]
  createdAt?: string
  updatedAt?: string
}

export type SubSectionProps = {
  id: string
  name: string
  title?: string
  content?: string
  imageUrl?: string
  isSubSubSection?: boolean
  isLive?: boolean
  subSubSections?: SubSubSectionProps[]
  createdAt?: string
  updatedAt?: string
}

export type SubSubSectionProps = {
  id: string
  name: string
  title?: string
  content?: string
  imageUrl?: string
  isLive?: boolean
}

export type EconomicDataWidgetProps = {
  id: string
  title: string
  stats: string
  descriptionLine1: string
  descriptionLine2: string
  linkName: string
  linkUrl: string
  createdAt: string
  updatedAt: string
}

export type DistrictDataProps = {
  id?: string
  name?: string
  imageUrl?: string
  logoIcon?: string
  isLive?: boolean
  county?: CountyDataProps
  districtSections?: DistrictSectionProps[]
  createdAt?: string
  updatedAt?: string
}
export type CountyDataProps = {
  id?: string
  name: string
  imageUrl: string
  logoIcon: string
  published: boolean
  viewCount: number
  isLive: boolean
  welcome: {
    id: string
    name: string
    title: string
    content: string
    isLive: boolean
    createdAt: string
    updatedAt: string
    imageUrl: string
  }
  lep: {
    id: string
    name: string
    title: string
    content: string
    isLive: boolean
    createdAt: string
    updatedAt: string
    imageUrl: string
  }
  news: {
    id: string
    name: string
    title: string
    content: string
    isLive: boolean
    createdAt: string
    updatedAt: string
    imageUrl: string
  }
  districts: DistrictDataProps[]
  sections: SectionProps[]
  createdAt: string
  updatedAt: string
  imageFile?: string | ArrayBuffer | null
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
  isSuperAdmin?: boolean
  passwordInput?: string
  role?: ROLE
  contactNumber?: string
  imageUrl?: string
  imageFile?: string | ArrayBuffer | null
  county?: string
  postCode?: string
  organisation?: {
    id?: string
    name?: string
    userId?: string
    createdAt?: string
  }
  district?: string
  emailVerified?: boolean
  acceptTermsAndConditions?: boolean
}

export type PartnerData = {
  id?: string
  name: string
  email: string
  organisation?: {
    id: string
    name: string
  }
  partner?: {
    id: string
    name: string
    email: string
  }
  description: string
  category: string
  businessType: string
  website: string
  isLive?: boolean
  isHidden?: boolean
  isApproved?: boolean
  status?: Status
  areaOfOperation: AreasOfOperation
  valueCategory: ValueCategory
  partnerType: PartnerType
  projectsResponsibleFor: string
  closingDate: Date
  isEmail: boolean
  position: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  currentUser: CurrentUser | null
  message: string
  token: string | null
  error: Error | undefined
}


export interface IPartnerState {
  partnersData: PartnerData[]
  partnerData: PartnerData | null
  type: string
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

export enum AreasOfOperation {
  STARTUP = 'STARTUP',
  SMALL_BUSINESS = 'SMALL_BUSINESS',
  GROWING_BUSINESS = 'GROWING_BUSINESS',
  BAME = 'BAME',
  WOMEN_OWNED = 'WOMEN_OWNED',
  ENTERPRISE = 'ENTERPRISE',
  OTHER = 'OTHER',
}

export interface Children {
  children: ReactNode
}

export type ComponentShieldBaseProps = Children & {
  RBAC?: never
  showIf?: never
}

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
