import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'

export interface IContentDrawerSubNavData {
  title: string
  path: string
  icon: JSX.Element
  listIcon: JSX.Element
  iconOpenClosed: JSX.Element
  subNav: {
    title: string
    path: string
    listIcon?: JSX.Element
    iconOpenClosed?: JSX.Element
    subNavTwo?: {
      title: string
      path: string
    }[]
  }[]
}

export const contentDrawerSubNavData: IContentDrawerSubNavData[] = [
  {
    title: 'Why Invest in',
    path: '/admin/editor-portal/county-portal/district/why-invest-in',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [],
  },
  {
    title: 'Business news and information',
    path: '/admin/editor-portal/county-portal/district/business-news-and-information',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8 " />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [],
  },
  {
    title: 'Support for Start-ups',
    path: '#',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8" />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [
      {
        title: 'Business Plans',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/business-plans',
      },
      {
        title: 'Market Research',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/market-research',
      },
      {
        title: 'Legal Checklist',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/legal-checklist',
      },
      {
        title: 'Find Start-up funding',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/find-start-up-funding',
      },
      {
        title: 'Vat and Tax',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/vat-and-tax',
      },
      {
        title: 'Business Insurance',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/business-insurance',
      },
      {
        title: 'Becoming a greener business',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/becoming-a-greener-business',
        listIcon: <FaIcons.FaRegFile color="#00dcb3" />,
        iconOpenClosed: <MdIcons.MdArrowRight />,
        subNavTwo: [
          {
            title: 'one',
            path: '/admin/editor-portal/county-portal/district/support-for-start-ups/becoming-a-greener-business/one',
          },
        ],
      },
    ],
  },
  {
    title: 'Support for established businesses',
    path: '/admin/editor-portal/county-portal/district/support-for-established-businesses',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [],
  },
  {
    title: 'Topical business issues',
    path: '#',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8 " />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [
      {
        title: 'Help with mental health and wellbeing',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/topical-business-issues/help-with-mental-health-and-wellbeing',
      },
      {
        title: 'Help for social enterprises',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/topical-business-issues/help-for-social-enterprises',
      },
      {
        title: 'Help for Heritage and Tourism',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/topical-business-issues/help-for-heritage-and-tourism',
      },
      {
        title: 'Help for Covid Business Support',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/topical-business-issues/help-for-covid-business-support',
      },
      {
        title: 'Help for Carbon & Net Zero Targets',
        path: '/admin/editor-portal/county-portal/district/support-for-start-ups/topical-business-issues/help-for-carbon-and-net-zero-targets',
      },
    ],
  },
]
