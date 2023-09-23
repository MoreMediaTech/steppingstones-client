'use client'

import React from 'react'
import RichTextToolbar from './RichTextToolbar'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";

import { ControllerRenderProps } from 'react-hook-form'
import { ContentFormProps } from '@models/ContentForm'

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
  field,
}: {
  field: ControllerRenderProps<ContentFormProps, 'content'>
}) => {
  return (
    <div className="w-full">
      <RichTextToolbar id="toolbar" />
      <ReactQuill
        modules={modules}
        placeholder="compose here"
        {...field}
        aria-label="content"
        onChange={(content) => field.onChange(content)}
        formats={formats}
        theme="snow"
        className='w-full'
        style={{ height: '400px', overflowY: 'scroll', width: '100%' }}
      />
    </div>
  )
}

export default RichTextEditor
