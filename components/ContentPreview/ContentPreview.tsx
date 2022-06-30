import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser'
import styles from './ContentPreview.module.css'

type ContentPreviewProps = {
  content?: { title: string; imageUrl: string; content: string }
  economicData?: {
    averageHousingCost: number
    averageWageEarnings: number
    employmentInvestmentLand: number
    labourDemand: number
    noOfRetailShops: number
    numOfBusinessParks: number
    numOfRegisteredCompanies: number
    unemploymentRate: number
    workingAgePopulation: number
  }
}

const ContentPreview = ({ content, economicData }: ContentPreviewProps) => {
  return (
    <div className="w-full  overflow-auto p-4">
      <div className="space-y-6 border border-gray-200 p-4">
        <div className="mb-2 text-2xl font-semibold capitalize text-[#00DCB3] ">
          <h1>{content?.title ? content.title : 'Economic Data'}</h1>
        </div>
        {!!content?.imageUrl && (
          <div className="w-full">
            <Image
              src={content?.imageUrl}
              alt={content?.title}
              width={400}
              height={400}
            />
          </div>
        )}
        {content?.content && (
          <div className={styles.content}>
            {parse(content?.content as string)}
          </div>
        )}
        {economicData && (
          <div className="w-full space-y-4 text-xl">
            <div className="text-gray-500">
              Average Housing Cost:{' '}
              <span className='text-gray-900'>{economicData?.averageHousingCost}</span>{' '}
            </div>
            <div className="text-gray-500">
              Average Wage Earnings:{' '}
              <span className='text-gray-900'>{economicData?.averageWageEarnings}</span>
            </div>
            <div className="text-gray-500">
              Employment Investment Land:{' '}
              <span className='text-gray-900'> {economicData?.employmentInvestmentLand}</span>{' '}
            </div>
            <div className="text-gray-500">
              Labour Demand: <span className='text-gray-900'>{economicData?.labourDemand}</span>
            </div>
            <div className="text-gray-500">
              Number of Retail Shops:{' '}
              <span className='text-gray-900'>{economicData?.noOfRetailShops}</span>{' '}
            </div>
            <div className="text-gray-500">
              Number of Business Parks:{' '}
              <span className='text-gray-900'>{economicData?.numOfBusinessParks}</span>{' '}
            </div>
            <div className="text-gray-500">
              Number of Registered Companies:{' '}
              <span className='text-gray-900'>{economicData?.numOfRegisteredCompanies}</span>{' '}
            </div>
            <div className="text-gray-500">
              Unemployment Rate: <span className='text-gray-900'> {economicData?.unemploymentRate}</span>
            </div>
            <div className="text-gray-500">
              Working Age Population:{' '}
              <span className='text-gray-900'>{economicData?.workingAgePopulation}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentPreview
