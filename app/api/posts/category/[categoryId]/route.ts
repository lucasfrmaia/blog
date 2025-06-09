import { apiManager } from "@/app/api/_services/ApiManager";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
   params: {
      categoryId: string;
   };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { categoryId } = params;
      const posts = await apiManager.post.findByCategory(categoryId);

      return NextResponse.json(posts);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar posts da categoria" },
         { status: 500 }
      );
   }
}
