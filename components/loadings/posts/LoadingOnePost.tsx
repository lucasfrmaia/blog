import BaseLayout from "@/components/layout/BaseLayout";

export function LoadingOnePost() {
   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            <div>Carregando...</div>
         </div>
      </BaseLayout>
   );
}
