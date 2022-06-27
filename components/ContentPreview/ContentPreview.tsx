import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser'
import styles from './ContentPreview.module.css'

type ContentPreviewProps = {
  content: { title: string; imageUrl: string; content: string }
}

const ContentPreview = ({ content }: ContentPreviewProps) => {
  return (
    <div className="w-full  overflow-auto p-4">
      <div className="space-y-6 border border-gray-200 p-4">
        <div className="mb-2 text-2xl font-semibold capitalize text-[#00DCB3] ">
          <h1>{content?.title}</h1>
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
        <div className={styles.content}>
          {parse(content?.content as string)}
        </div>
      </div>
    </div>
  )
}

export default ContentPreview
