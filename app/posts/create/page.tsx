import React, { useState } from "react";
import { cn } from "@/lib/utils";
import NaveBar from "@/components/header/NaveBar";
import Footer from "@/components/footer/Footer";
import BaseSection from "@/components/ui/utils/BaseSection";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type IPropPage = {
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

export default function Page({ children, className }: IPropPage) {
   const [value, setValue] = useState("");

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
   } = useForm<FormProps>({ resolver: zodResolver(schema) });

   const onSubmit: SubmitHandler<FormProps> = async (data) => {};

   return (
      <>
         <NaveBar />

         <BaseSection>
            <form onSubmit={handleSubmit(onSubmit)}>
               <h1 className="text-2xl font-semibold text-center">
                  Criar Post
               </h1>

               <div>
                  <Label />
                  <Input {...register("title")} />
               </div>

               <ReactQuill theme="snow" value={value} onChange={setValue} />

               <Button>Criar Post</Button>
            </form>
         </BaseSection>

         <Footer />
      </>
   );
}
