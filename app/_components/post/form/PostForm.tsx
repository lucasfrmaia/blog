"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IPost } from "@/app/api/_services/modules/post/entities/Post";
import { ICategory } from "@/app/api/_services/modules/category/entities/category";
import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import PostEditor from "../editor/PostEditor";
import PostPreview from "../preview/PostPreview";

interface PostFormProps {
   className?: string;
   defaultValues?: Partial<IPost>;
   isLoading?: boolean;
   onSubmit: (formData: FormData) => Promise<void>;
}

export default function PostForm({
   defaultValues,
   isLoading,
   onSubmit,
}: PostFormProps) {
   const [content, setContent] = useState(defaultValues?.content || "");
   const [selectedCategories, setSelectedCategories] = useState<string[]>(
      defaultValues?.categories?.map((cat) => cat.id) || []
   );

   const { data: categories } = useQuery<ICategory[]>({
      queryKey: ["categories"],
      queryFn: async () => {
         const response = await fetch("/api/categories");
         if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
         }
         return response.json();
      },
   });

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.set("content", content);
      formData.set("categories", JSON.stringify(selectedCategories));
      await onSubmit(formData);
   };

   return (
      <Tabs defaultValue="editor" className="w-full">
         <TabsList className="mb-4">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
         </TabsList>

         <TabsContent className="overflow-y-auto" value="editor">
            <form onSubmit={handleSubmit} className="space-y-8">
               <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                     id="title"
                     name="title"
                     defaultValue={defaultValues?.title}
                     required
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                     id="description"
                     name="description"
                     defaultValue={defaultValues?.description}
                     required
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="coverImage">Imagem de Capa (URL)</Label>
                  <Input
                     id="coverImage"
                     name="coverImage"
                     type="url"
                     defaultValue={defaultValues?.img}
                  />
               </div>

               <div className="space-y-2">
                  <Label>Categorias</Label>
                  <Select
                     value={selectedCategories[0]}
                     onValueChange={(value) => setSelectedCategories([value])}
                  >
                     <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                     </SelectTrigger>
                     <SelectContent>
                        {categories?.map((category) => (
                           <SelectItem key={category.id} value={category.id}>
                              {category.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>

               <div className="space-y-2">
                  <Label>Conteúdo</Label>
                  <PostEditor value={content} onChange={setContent} />
               </div>

               <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar"}
               </Button>
            </form>
         </TabsContent>

         <TabsContent value="preview">
            <PostPreview
               title={defaultValues?.title || ""}
               description={defaultValues?.description || ""}
               content={content}
               coverImage={defaultValues?.img}
               categories={
                  categories?.filter((cat) =>
                     selectedCategories.includes(cat.id)
                  ) || []
               }
            />
         </TabsContent>
      </Tabs>
   );
}
