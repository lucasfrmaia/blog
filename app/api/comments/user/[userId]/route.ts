import { apiManager } from "@/app/api/_services/ApiManager";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
   params: {
      userId: string;
   };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { userId } = params;
      const comments = await apiManager.comment.findByUserId(userId);

      return NextResponse.json(comments);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar comentários do usuário" },
         { status: 500 }
      );
   }
}
