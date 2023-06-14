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

export const faqItems = [
  {
    id: 1,
    question: 'When will Stepping Stones Beta be available?',
    answer:
      'More Media Tech is currently building the Stepping Stones App. Subscribers will get an invitation to access the app and try our the features in the Summer of 2022. Your feedback will be used to make the app better and prep for official launch in the Winter of 2022.',
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
      "The app will be available on the Apple and Android app stores for a one-time fee. Beta testers will be able to try the app for 6months free. Once the Beta phase is complete, users will need to pay a fee to continue using the app's features.",
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
