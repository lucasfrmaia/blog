import { apiManager } from "@/app/api/_services/ApiManager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   try {
      // Obter o parâmetro 'limit' da URL se existir
      const url = new URL(request.url);
      const limitParam = url.searchParams.get("limit");
      const limit = limitParam ? parseInt(limitParam) : undefined;

      const categories = await apiManager.category.findPopularCategories(limit);

      return NextResponse.json(categories);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar categorias populares" },
         { status: 500 }
      );
   }
}
