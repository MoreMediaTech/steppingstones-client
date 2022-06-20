import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser'
import styles from './ContentPreview.module.css'

type ContentPreviewProps = {
    whyInvestContent: {title: string
    imageUrl: string
    content: string}
}

const ContentPreview = ({whyInvestContent}: ContentPreviewProps) => {
  return (
    <div className="w-full space-y-4 overflow-auto p-4">
      <div className="font-mono text-2xl capitalize underline ">
        <h1>{whyInvestContent?.title}</h1>
      </div>
      <div className="w-full">
        <Image
          src={whyInvestContent?.imageUrl}
          alt={whyInvestContent?.title}
          width={400}
          height={400}
        />
      </div>
      <div className={styles.content}>{parse(whyInvestContent?.content)}</div>
    </div>
  )
}

export default ContentPreview