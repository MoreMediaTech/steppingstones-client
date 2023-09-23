import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser'
import 'react-quill/dist/quill.snow.css'
import styles from './ContentPreview.module.css'

// components
import Header from '@components/Header'

// zod schemas
import { PartialSectionSchemaProps } from '@models/Section'

type ContentPreviewProps = {
  content?: PartialSectionSchemaProps;
};

const ContentPreview = ({ content }: ContentPreviewProps) => {
  return (
    <div className="w-full  overflow-auto py-2">
      <div className="space-y-2 rounded-md border border-gray-800 p-2 dark:border-gray-200 md:p-4">
        <Header
          title={content?.title ? content.title : 'Create New Content'}
          order={1}
        />
       
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
          <div className={`${styles.ql_snow} !dark:text-gray-200`}>
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
