import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import { IContentDrawerSubNavData } from '@lib/types'



export const contentDrawerSubNavData: IContentDrawerSubNavData[] = [
  {
    title: 'Business news and information',
    path: '/admin/editor-portal/county-portal',
    subPath: 'business-news-and-information',
    path2: '/admin/editor-portal/county-portal',
    subPath2: 'business-news-and-information',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8 " />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [],
  },
  {
    title: 'Support for Startups',
    path2: '/admin/editor-portal/county-portal',
    subPath2: 'support-for-startups',
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
    title: 'Growing a business',
    path2: '/admin/editor-portal/county-portal',
    subPath2: 'growing-a-business',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [
      {
        title: 'Find Funding',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/find-funding',
      },
      {
        title: 'Operate More Efficiently',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/operate-more-efficiently',
      },
      {
        title: 'Find Tenders and Contracts',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/find-tenders-and-contracts',
      },
      {
        title: 'Improve Skills',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/improve-skills',
      },
      {
        title: 'Trading Overseas',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/trading-overseas',
      },
      {
        title: 'Develop Products and Services',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/develop-products-and-services',
      },
      {
        title: 'Find New Markets',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/find-new-markets',
      },
      {
        title: 'Employ People',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/employ-people',
      },
      {
        title: 'Commercial Property',
        path: '/admin/editor-portal/county-portal',
        subPath: 'growing-a-business/commercial-property',
      },
    ],
  },
  {
    title: 'Topical Issues',
    path2: '/admin/editor-portal/county-portal',
    subPath2: 'topical-business-issues',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8 " />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [
      {
        title: 'Online Digitalisation',
        path: '/admin/editor-portal/county-portal',
        subPath: 'topical-business-issues/online-digitalisation',
      },
      {
        title: 'Mental health and wellbeing at Work',
        path: '/admin/editor-portal/county-portal',
        subPath: 'topical-business-issues/mental-health-and-wellbeing',
      },
      {
        title: 'Support for LGBTQ+ and Disabilities',
        path: '/admin/editor-portal/county-portal',
        subPath: 'topical-business-issues/lgbtq-and-disabilities',
      },
      {
        title: 'Social enterprises',
        path: '/admin/editor-portal/county-portal',
        subPath: 'topical-business-issues/social-enterprises',
      },
      {
        title: 'Heritage and Tourism',
        path: '/admin/editor-portal/county-portal',
        subPath: 'topical-business-issues/heritage-and-tourism',
      },
      {
        title: 'Covid Business Support',
        path: '/admin/editor-portal/county-portal',
        subPath: 'topical-business-issues/covid-business-support',
      },
      {
        title: 'Low Carbon & Net Zero Targets',
        path: '/admin/editor-portal/county-portal',
        subPath: 'topical-business-issues/carbon-and-net-zero-targets',
      },
    ],
  },
  {
    title: 'Feature Article',
    path: '/admin/editor-portal/county-portal',
    subPath: 'feature-article',
    path2: '/admin/editor-portal/county-portal',
    subPath2: 'feature-article',
    icon: <FaIcons.FaListUl color="#f4900c" />,
    listIcon: <FaIcons.FaRegFile color="#00dcb3" className="-ml-8 " />,
    iconOpenClosed: <MdIcons.MdArrowRight />,
    subNav: [],
  },
]
