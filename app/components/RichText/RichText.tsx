"use client";

import React from "react";
import RichTextToolbar from "./RichTextToolbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.styles.css"

import { ControllerRenderProps } from "react-hook-form";
import { ContentFormProps } from "@models/ContentForm";

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history?.undo();
}
function redoChange() {
  this.quill.history?.redo();
}

const RichTextEditor = ({
  field,
}: {
  field: Omit<ControllerRenderProps<ContentFormProps, "content">, 'ref'>;
}) => {
  // Editor ref
  const quillRef = React.useRef<React.ElementRef<typeof ReactQuill>>();

  const imageHandler = React.useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files?.[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quillRef.current?.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor?.getSelection(true);
        quillEditor?.insertEmbed(
          range?.index as number,
          "image",
          imageUrl,
          "user",
        );
      };

      reader.readAsDataURL(file as Blob);
    };
  }, []);

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] },{background: []}],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{script: "sub"}, {script: "super"}],
          [{ align: [] }],
          ["link", "image", "code-block"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler],
  );

  // Formats objects for setting up the Quill editor
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  return (
    <div className="w-full editor">
      {/* <RichTextToolbar id="toolbar" /> */}
      <ReactQuill
        ref={quillRef as React.LegacyRef<ReactQuill>}
        modules={modules}
        placeholder="compose here"
        {...field}
        aria-label="content"
        onChange={(content) => field.onChange(content)}
        formats={formats}
        theme="snow"
        className="min-h-[500px] bg-background"
      />
    </div>
  );
};

export default RichTextEditor;
