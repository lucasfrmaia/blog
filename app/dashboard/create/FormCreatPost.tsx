"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { MultiSelect } from "@/components/ui/mult-select";

type IPropFormCreatePost = {
   children?: React.ReactNode;
   className?: string;
};

const schema = z.object({
   title: z.string().min(1, "Este campo é obrigatório"),
   description: z.string().min(1, "Este campo é obrigatório"),
   categories: z.array(
      z.object({
         id: z.string(),
         name: z.string(),
      })
   ),
});

type FormProps = z.infer<typeof schema>;

export default function FormCreatePost({
   children,
   className,
}: IPropFormCreatePost) {
   const [selected, setSelected] = useState<string[]>([]);
   const [value, setValue] = useState("");

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
   } = useForm<FormProps>({ resolver: zodResolver(schema) });

   const onSubmit: SubmitHandler<FormProps> = async (data) => {};

   return (
      <div className={cn("w-1/2 min-w-80", className)}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-semibold text-center">Criar Post</h1>

            <div className="flex flex-col gap-y-4">
               <div>
                  <h3 className="text-2xl font-semibold line-clamp-2 mb-2">
                     Título
                  </h3>
                  <Input placeholder="Digite o título do post..." />
               </div>

               <div>
                  <h3 className="text-2xl font-semibold line-clamp-2 mb-2">
                     Descrição
                  </h3>
                  <ReactQuill
                     placeholder="Digite a descrição do post..."
                     className="border"
                     theme="snow"
                     value={value}
                     onChange={setValue}
                  />
               </div>

               <div className="">
                  <h3 className="text-2xl font-semibold line-clamp-2 mb-2">
                     Categorias
                  </h3>
                  <MultiSelect
                     selected={selected}
                     options={[
                        {
                           value: "next.js",
                           label: "Next.js",
                        },
                        {
                           value: "sveltekit",
                           label: "SvelteKit",
                        },
                        {
                           value: "nuxt.js",
                           label: "Nuxt.js",
                        },
                        {
                           value: "remix",
                           label: "Remix",
                        },
                        {
                           value: "astro",
                           label: "Astro",
                        },
                        {
                           value: "wordpress",
                           label: "WordPress",
                        },
                        {
                           value: "express.js",
                           label: "Express.js",
                        },
                     ]}
                     onChange={setSelected}
                  />
               </div>

               <Button variant="secondary" type="submit">
                  Criar Post
               </Button>
            </div>
         </form>
      </div>
   );
}
