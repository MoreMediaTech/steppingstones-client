// RichText.tsx in your components folder
import React, { Suspense } from 'react'
import RichTextToolbar from './RichTextToolbar'
import ReactQuill from 'react-quill'

import styles from '../ContentPreview/ContentPreview.module.css'

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
    <div className="w-full ">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  )
}

export default RichTextEditor
