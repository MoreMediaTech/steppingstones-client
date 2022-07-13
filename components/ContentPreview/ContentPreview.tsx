import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser'
import 'react-quill/dist/quill.snow.css'
import styles from './ContentPreview.module.css'
import EconomicDataPreview from './EconomicDataPreview'

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
              width={900}
              height={400}
            />
          </div>
        )}
        {content?.content && (
          <div className={styles.ql_snow}>
            <div className="ql-editor">{parse(content?.content as string)}</div>
          </div>
        )}
        {economicData && <EconomicDataPreview economicData={economicData} />}
      </div>
    </div>
  )
}

export default ContentPreview
