"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICategory } from "@/services/modules/category/entities/category";
import { Badge } from "@/components/ui/badge";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import PostEditor from "../editor/PostEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostPreview from "../preview/PostPreview";
import { IPost } from "@/services/modules/post/entities/Post";

interface PostFormProps {
   categories?: ICategory[];
   isLoading?: boolean;
   defaultValues?: Partial<IPost>;
   onSubmit: (data: FormData) => Promise<void>;
}

export default function PostForm({
   categories = [],
   isLoading,
   defaultValues,
   onSubmit,
}: PostFormProps) {
   const [selectedCategories, setSelectedCategories] = useState<ICategory[]>(
      defaultValues?.categories || []
   );
   const [coverImage, setCoverImage] = useState<string>(
      defaultValues?.img || ""
   );
   const [content, setContent] = useState(defaultValues?.content || "");
   const [title, setTitle] = useState(defaultValues?.title || "");
   const [description, setDescription] = useState(
      defaultValues?.description || ""
   );

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setCoverImage(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleCategorySelect = (categoryId: string) => {
      const category = categories.find((c) => c.id === categoryId);
      if (category && !selectedCategories.find((c) => c.id === categoryId)) {
         setSelectedCategories([...selectedCategories, category]);
      }
   };

   const handleCategoryRemove = (categoryId: string) => {
      setSelectedCategories(
         selectedCategories.filter((c) => c.id !== categoryId)
      );
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.append("categories", JSON.stringify(selectedCategories));
      formData.append("content", content);
      if (coverImage) {
         formData.append("coverImage", coverImage);
      }
      await onSubmit(formData);
   };

   return (
      <form onSubmit={handleSubmit}>
         <Tabs defaultValue="edit" className="w-full">
            <TabsList className="mb-4">
               <TabsTrigger value="edit">Editar</TabsTrigger>
               <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit">
               <div className="grid gap-8">
                  {/* Basic Information */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Informações Básicas</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="title">Título</Label>
                           <Input
                              id="title"
                              name="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="Digite o título do post"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="description">Descrição</Label>
                           <Textarea
                              id="description"
                              name="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Digite uma breve descrição do post"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <Label>Categorias</Label>
                           <Select
                              onValueChange={handleCategorySelect}
                              value=""
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Selecione as categorias" />
                              </SelectTrigger>
                              <SelectContent>
                                 {categories.map((category) => (
                                    <SelectItem
                                       key={category.id}
                                       value={category.id}
                                    >
                                       {category.title}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>

                           <div className="flex flex-wrap gap-2 mt-2">
                              {selectedCategories.map((category) => (
                                 <Badge
                                    key={category.id}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                 >
                                    {category.title}
                                    <Button
                                       type="button"
                                       variant="ghost"
                                       size="icon"
                                       className="h-4 w-4 p-0 hover:bg-transparent"
                                       onClick={() =>
                                          handleCategoryRemove(category.id)
                                       }
                                    >
                                       <X className="h-3 w-3" />
                                    </Button>
                                 </Badge>
                              ))}
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Cover Image */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Imagem de Capa</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="flex flex-col items-center justify-center gap-4">
                           <div
                              className={cn(
                                 "w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative",
                                 coverImage && "border-0"
                              )}
                           >
                              {coverImage ? (
                                 <img
                                    src={coverImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                 />
                              ) : (
                                 <div className="text-center p-8">
                                    <ImagePlus className="w-12 h-12 mx-auto text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                       Clique para adicionar uma imagem
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                       PNG, JPG ou GIF até 10MB
                                    </p>
                                 </div>
                              )}
                              <input
                                 type="file"
                                 accept="image/*"
                                 onChange={handleImageChange}
                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Content */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Conteúdo</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <PostEditor
                           value={content}
                           onChange={(value) => setContent(value)}
                        />
                     </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex justify-end">
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLoading
                           ? "Salvando..."
                           : defaultValues
                           ? "Atualizar"
                           : "Criar"}
                     </Button>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="preview">
               <PostPreview
                  title={title}
                  description={description}
                  content={content}
                  coverImage={coverImage}
                  categories={selectedCategories}
               />
            </TabsContent>
         </Tabs>
      </form>
   );
}
