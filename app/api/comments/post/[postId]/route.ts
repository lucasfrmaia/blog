import { apiManager } from "@/app/api/_services/ApiManager";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
   params: {
      postId: string;
   };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { postId } = params;
      const comments = await apiManager.comment.findByPostId(postId);

      return NextResponse.json(comments);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar comentários do post" },
         { status: 500 }
      );
   }
}
