import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
   params: {
      postId: string;
   };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { postId } = params;
      const categories = await apiManager.category.findByPostId(postId);

      return NextResponse.json(categories);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar categorias do post" },
         { status: 500 }
      );
   }
}
