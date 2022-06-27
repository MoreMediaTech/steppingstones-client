// RichText.tsx in your components folder
import dynamic from 'next/dynamic'
import React from 'react'

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,

})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],

    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

const RichTextEditor = ({
  value,
  setValue,
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div className='w-full'>
      <ReactQuill
        modules={modules}
        placeholder="compose here"
        value={value || ''}
        aria-label="content"
        onChange={(content) => setValue(content)}
        formats={formats}
        theme="snow"
      />
    </div>
  )
}

export default RichTextEditor
