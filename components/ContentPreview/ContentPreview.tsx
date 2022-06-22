import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser'
import styles from './ContentPreview.module.css'

type ContentPreviewProps = {
 content: { title: string; imageUrl: string; content: string }
}

const ContentPreview = ({content }: ContentPreviewProps) => {
  return (
    <div className="w-full  overflow-auto p-4">
      <div className="space-y-4 border border-gray-200 p-4">
        <div className="font-mono text-2xl capitalize underline ">
          <h1>{content?.title}</h1>
        </div>
        <div className="w-full">
          <Image
            src={content?.imageUrl}
            alt={content?.title}
            width={400}
            height={400}
          />
        </div>
        <div className={styles.content}>{parse(content?.content as string)}</div>
      </div>
    </div>
  )
}

export default ContentPreview
