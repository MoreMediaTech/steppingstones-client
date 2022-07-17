// RichText.tsx in your components folder
import dynamic from 'next/dynamic'
import React from 'react'
import RichTextToolbar from './RichTextToolbar'

import styles from '../ContentPreview/ContentPreview.module.css'
const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
})

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history?.undo()
}
function redoChange() {
  this.quill.history?.redo()
}

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
}

// Formats objects for setting up the Quill editor
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
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
      <RichTextToolbar id="toolbar" />
      <ReactQuill
        modules={modules}
        placeholder="compose here"
        value={value || ''}
        aria-label="content"
        onChange={(content) => setValue(content)}
        formats={formats}
        theme="snow"
        style={{ height: '400px', overflowY: 'scroll', width: '100%' }}
      />
    </div>
  )
}

export default RichTextEditor
