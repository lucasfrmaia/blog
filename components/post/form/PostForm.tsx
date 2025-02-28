"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiManager } from "@/services/modules/ApiManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import PostEditor from "../editor/PostEditor";
import PostPreview from "../preview/PostPreview";
import { IPost } from "@/services/modules/post/entities/Post";
import { ICategory } from "@/services/modules/category/entities/category";

interface PostFormProps {
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
      defaultValues?.category?.map((cat) => cat.id) || []
   );

   const { data: categories } = useQuery<ICategory[]>({
      queryKey: ["categories"],
      queryFn: () => apiManager.category.findAll(),
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

         <TabsContent value="editor">
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
