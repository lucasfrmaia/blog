"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface PostEditorProps {
   value: string;
   onChange: (value: string) => void;
   placeholder?: string;
}

const modules = {
   toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
      [{ color: [] }, { background: [] }],
      ["code-block", "blockquote"],
   ],
};

const formats = [
   "header",
   "bold",
   "italic",
   "underline",
   "strike",
   "list",
   "bullet",
   "indent",
   "align",
   "link",
   "image",
   "video",
   "color",
   "background",
   "code-block",
   "blockquote",
];

export default function PostEditor({
   value,
   onChange,
   placeholder = "Escreva o conteúdo do seu post...",
}: PostEditorProps) {
   return (
      <ReactQuill
         theme="snow"
         value={value}
         onChange={onChange}
         modules={modules}
         formats={formats}
         placeholder={placeholder}
         className="h-[400px] mb-12"
      />
   );
}
