import {
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpCircle,
  ArrowUpToLine,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react'
import { BiHomeCircle } from 'react-icons/bi'
import { FaRegCalendarAlt, FaRegEnvelope } from 'react-icons/fa'
import { GiPortal } from 'react-icons/gi'
import { GoFileDirectory } from 'react-icons/go'
import {
  MdOutlineReviews,
  MdOutlineSpeakerNotes,
  MdNotifications,
  MdSupportAgent,
  MdManageAccounts,
  MdSettings,
} from "react-icons/md";
import { GrResources } from 'react-icons/gr'

export const faqItems = [
  {
    id: 1,
    question: 'When will Stepping Stones Beta be available?',
    answer:
      'Equilibrium Startup Labs is currently building the Stepping Stones App to serve Nottingham County businesses. Beta subscribers will get an invitation to access the app and try out the features in the Winter of 2023. Your feedback will be used to make the app better and prepare for its official launch in the Spring of 2024.',
  },
  {
    id: 2,
    question: 'What is great about Stepping Stones?',
    answer:
      'You get the latest business support information tailored to your local district at your finger tips. You also get push to email function so you can reach out to your economic development officer for one-on-one support and access to resource information.',
  },
  {
    id: 3,
    question: 'Will the app be available for Android users?',
    answer:
      'Yes! Our hybrid app will be available for both IOS and Android platforms. Beta users will be sent a special invite to test the app before we launch it in stores.',
  },
  {
    id: 4,
    question: 'Can I partner with you?',
    answer:
      'We are open to partnership opportunities. Send an email to info@steppingstonesapp.com with your proposal and we will be in touch.',
  },
  {
    id: 5,
    question: 'Will the app be free?',
    answer:
      "The app will be available on the Apple and Android app stores for free to Beta testers. Once the Beta phase is complete, users will need to pay a one-time fee to continue using the app's features. In-app services will be available in the future.",
  },
  {
    id: 6,
    question: 'Are there upgrade options?',
    answer:
      'Our app will evolve over time. Current features will be available to all users and we will test new services frequently. Based on demand, we will do full roll-outs and offer upgrade options for boutique solutions in the future.',
  },
  {
    id: 7,
    question: 'Is this app for the UK only?',
    answer:
      'Our Beta app will be restricted to one region in the UK. Post-Beta, we will add more regions to the app to cover the whole of the UK. We are working with partners to offer the platform to other countries on a white-label basis. If you would like this app in your country, email info@steppingstonesapp.com for more information.',
  },
]

export const NAV_ITEMS = [
  {
    label: "Portal Home",
    Icon: BiHomeCircle,
    href: "/admin-portal",
  },
  {
    label: "Advertisements",
    href: "/admin-portal/ads-section",
    Icon: MdOutlineSpeakerNotes,
  },
  {
    label: "County Portal",
    href: "/admin-portal/county-portal",
    Icon: GiPortal,
  },
  {
    label: "Client Meetings",
    href: "/admin-portal/client-meeting",
    Icon: FaRegCalendarAlt,
  },
  {
    label: "Feedback",
    href: "/admin-portal/feedback",
    Icon: MdOutlineReviews,
  },
  {
    label: "Messages",
    Icon: FaRegEnvelope,
    href: "/admin-portal/messages/Inbox",
  },
  {
    label: "Notifications",
    Icon: MdNotifications,
    href: "/admin-portal/notifications",
  },
  {
    label: "Support",
    Icon: MdSupportAgent,
    href: "/admin-portal/support",
  },
  {
    label: "Manage Users",
    Icon: MdManageAccounts,
    href: "/admin-portal/users",
  },
  {
    label: "Admin",
    Icon: null,
    href: null,
  },
  {
    label: "Manage County",
    Icon: MdSettings,
    href: "/admin-portal/admin/county-setting",
  },
  {
    label: "Partner Directory",
    Icon: GoFileDirectory,
    href: "/admin-portal/admin/partner-directory",
  },
  {
    label: "Source Directory",
    Icon: GrResources,
    href: "/admin-portal/admin/source-directory",
  },
];

export const VALUE_CATEGORIES = [
  'NONE',
  'CREATIVE DIGITAL',
  'DIGITAL',
  'EMPLOYMENT',
  'FINANCIAL',
  'GLOBAL TRADING',
  'GREEN ENERGY',
  'INNOVATION',
  'MARKETING',
  'MENTAL HEALTH',
  'NETWORKING',
  'SECTOR GROWTH',
  'STARTUP',
  'STEM SECTORS',
  'TALENT',
  'TRADE ASSOCIATIONS',
  'TRAINING',
  'VISITOR ECONOMY',
]

export const PARTNER_TYPE = [
  'NONE',
  'PARTNER',
  'LEAD_PARTNER',
  'SENIOR_CONTACT',
]

export const counties = [
  'East Lothian',
  'Midlothian',
  'West Lothian',
  'Renfrewshire',
  'Buteshire',
  'Berwickshire',
  'Selkirkshire',
  'Peebles-shire',
  'Lanarkshire',
  'Ayrshire',
  'Northumberland',
  'Roxburghshire',
  'Dumfries-shire',
  'Kirkcudbrightshire',
  'Wigtownshire',
  'Tyne & Wear',
  'Durham',
  'Cumbria',
  'North Yorkshire',
  'E. Riding of Yorkshire',
  'W. Yorkshire',
  'Lancashire',
  'Greater Manchester',
  'Merseyside',
  'Lincolnshire',
  'S. Yorkshire',
  'Derbyshire',
  'Cheshire',
  'Flintshire',
  'Denbighshire',
  'Anglesey',
  'Caernarvonshire',
  'Rutland',
  'Leicestershire',
  'Staffordshire',
  'Shropshire',
  'Montgomeryshire',
  'Merionethshire',
  'Norfolk',
  'West Midlands',
  'Suffolk',
  'Cambridgeshire',
  'Bedfordshire',
  'Northamptonshire',
  'Warwickshire',
  'Worcestershire',
  'Herefordshire',
  'Radnorshire',
  'Cardiganshire',
  'Essex',
  'Hertfordshire',
  'Buckinghamshire',
  'Oxfordshire',
  'Gloucestershire',
  'Monmouthshire',
  'Breconshire',
  'Glamorgan',
  'Carmarthenshire',
  'Pembrokeshire',
  'Kent',
  'Greater London',
  'Surrey',
  'Berkshire',
  'Wiltshire',
  'Somerset',
  'East Sussex',
  'West Sussex',
  'Hampshire',
  'Dorset',
  'Devon',
  'Cornwall',
  'Antrim',
  'Derry / Londonderry',
  'Down',
  'Armagh',
  'Tyrone',
  'Fermanagh',
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircle,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: ArrowUpCircle,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle2,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: XCircle,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownToLine,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightToLine,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpToLine,
  },
]
