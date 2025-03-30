"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
   Bold,
   Italic,
   List,
   ListOrdered,
   Quote,
   Heading1,
   Heading2,
   Heading3,
   Code,
   Undo,
   Redo,
} from "lucide-react";
import { Editor } from "@tiptap/core";

interface PostEditorProps {
   value: string;
   onChange: (value: string) => void;
}

export default function PostEditor({ value, onChange }: PostEditorProps) {
   const editor = useEditor({
      extensions: [
         StarterKit,
         Placeholder.configure({
            placeholder: "Comece a escrever seu post...",
         }),
      ],
      content: value,
      onUpdate: ({ editor }: { editor: Editor }) => {
         onChange(editor.getHTML());
      },
   });

   if (!editor) {
      return null;
   }

   return (
      <div className="border rounded-lg overflow-hidden">
         <div className="flex flex-wrap gap-2 p-2 border-b bg-muted/50">
            <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleBold().run()}
               className={editor.isActive("bold") ? "bg-muted" : ""}
            >
               <Bold className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleItalic().run()}
               className={editor.isActive("italic") ? "bg-muted" : ""}
            >
               <Italic className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleBulletList().run()}
               className={editor.isActive("bulletList") ? "bg-muted" : ""}
            >
               <List className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleOrderedList().run()}
               className={editor.isActive("orderedList") ? "bg-muted" : ""}
            >
               <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleBlockquote().run()}
               className={editor.isActive("blockquote") ? "bg-muted" : ""}
            >
               <Quote className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
               }
               className={
                  editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""
               }
            >
               <Heading1 className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
               }
               className={
                  editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""
               }
            >
               <Heading2 className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
               }
               className={
                  editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""
               }
            >
               <Heading3 className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleCodeBlock().run()}
               className={editor.isActive("codeBlock") ? "bg-muted" : ""}
            >
               <Code className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().undo().run()}
            >
               <Undo className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().redo().run()}
            >
               <Redo className="h-4 w-4" />
            </Button>
         </div>
         <EditorContent
            editor={editor}
            className="prose prose-sm max-w-none p-4 focus:outline-none"
         />
      </div>
   );
}
