import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser'
import 'react-quill/dist/quill.snow.css'
import styles from './ContentPreview.module.css'
import { SectionProps, SubSectionProps, SubSubSectionProps } from '@lib/types'

type ContentPreviewProps = {
  content?: { title: string; imageUrl?: string; content: string } | SectionProps | SubSectionProps | SubSubSectionProps
}

const ContentPreview = ({ content }: ContentPreviewProps) => {
  return (
    <div className="w-full  overflow-auto py-2">
      <div className="space-y-6 border border-gray-200 p-1 md:p-4">
        <div className="mb-2 pl-4 text-2xl font-semibold capitalize text-[#00DCB3] ">
          <h1>{content?.title ? content.title : 'Create New Content'}</h1>
        </div>
        {!!content?.imageUrl && (
          <div className="w-full">
            <Image
              src={content?.imageUrl}
              alt={content?.title as string}
              width={900}
              height={400}
            />
          </div>
        )}
        {content?.content && (
          <div className={`${styles.ql_snow} !dark:text-gray-900`}>
            <div className={`${styles.ql_editor} `}>
              {parse(content?.content as string)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentPreview
