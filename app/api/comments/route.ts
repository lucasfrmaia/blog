import { apiManager } from "@/app/api/_services/ApiManager";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const comments = await apiManager.comment.findAll();
      return NextResponse.json(comments);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar comentários" },
         { status: 500 }
      );
   }
}
