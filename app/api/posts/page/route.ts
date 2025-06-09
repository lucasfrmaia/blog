import { apiManager } from "@/app/api/_services/ApiManager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   try {
      const url = new URL(request.url);

      // Obter os parâmetros da URL
      const pageParam = url.searchParams.get("page");
      const limitParam = url.searchParams.get("limit");
      const searchParam = url.searchParams.get("search");
      const categoriesParam = url.searchParams.get("categories");
      const sortByParam = url.searchParams.get("sortBy");

      // Converter para números e definir valores padrão
      const page = pageParam ? parseInt(pageParam) : 1;
      const limit = limitParam ? parseInt(limitParam) : 10;
      const search = searchParam || "";
      const categories = categoriesParam ? categoriesParam.split(",") : [];
      const sortBy = sortByParam || "recent";

      // Validar parâmetros
      if (page < 1 || limit < 1) {
         return NextResponse.json(
            { error: "Parâmetros de paginação inválidos" },
            { status: 400 }
         );
      }

      const result = await apiManager.post.findPerPage(page, limit, {
         search,
         categories,
         sortBy,
      });

      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json(
         {
            error:
               "Erro ao buscar posts paginados: " + (error as Error).message,
         },
         { status: 500 }
      );
   }
}
