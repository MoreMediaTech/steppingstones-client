import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import { IContentDrawerSubNavData } from '@lib/types'



export const contentDrawerSubNavData: IContentDrawerSubNavData[] = [
  {
    title: 'Business news and information',
    path: '/admin/editor-portal/county-portal',
    subPath: 'business-news-and-information',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8 " />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [],
  },
  {
    title: 'Support for Start-ups',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8" />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [
      {
        title: 'Business Plans',
        path: '/admin/editor-portal/county-portal',
        subPath: 'support-for-startups/business-plans',
      },
      {
        title: 'Market Research',
        path: '/admin/editor-portal/county-portal',
        subPath: 'support-for-startups/market-research',
      },
      {
        title: 'Legal Checklist',
        path: '/admin/editor-portal/county-portal',
        subPath: 'support-for-startups/legal-checklist',
      },
      {
        title: 'Find Start-up funding',
        path: '/admin/editor-portal/county-portal',
        subPath: 'support-for-startups/find-start-up-funding',
      },
      {
        title: 'Vat and Tax',
        path: '/admin/editor-portal/county-portal',
        subPath: 'support-for-startups/vat-and-tax',
      },
      {
        title: 'Business Insurance',
        path: '/admin/editor-portal/county-portal',
        subPath: 'support-for-startups/business-insurance',
      },
      {
        title: 'Becoming a greener business',
        path: '/admin/editor-portal/county-portal',
        subPath: 'support-for-startups/becoming-a-greener-business',
        listIcon: <FaIcons.FaRegFile color="#00dcb3" />,
        iconOpenClosed: <MdIcons.MdArrowRight />,
      },
    ],
  },
  {
    title: 'Support for established businesses',
    path: '/admin/editor-portal/county-portal',
    subPath: 'support-for-established-businesses',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [],
  },
  {
    title: 'Topical business issues',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8 " />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [
      {
        title: 'Help with mental health and wellbeing',
        path: '/admin/editor-portal/county-portal',
        subPath:
          'topical-business-issues/help-for-mental-health-and-wellbeing',
      },
      {
        title: 'Help for social enterprises',
        path: '/admin/editor-portal/county-portal',
        subPath:
          'topical-business-issues/help-for-social-enterprises',
      },
      {
        title: 'Help for Heritage and Tourism',
        path: '/admin/editor-portal/county-portal',
        subPath:
          'topical-business-issues/help-for-heritage-and-tourism',
      },
      {
        title: 'Help for Covid Business Support',
        path: '/admin/editor-portal/county-portal',
        subPath:
          'topical-business-issues/help-for-covid-business-support',
      },
      {
        title: 'Help for Carbon & Net Zero Targets',
        path: '/admin/editor-portal/county-portal',
        subPath:
          'topical-business-issues/help-for-carbon-and-net-zero-targets',
      },
    ],
  },
]
