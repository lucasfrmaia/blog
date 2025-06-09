import { apiManager } from "@/app/api/_services/ApiManager";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const latestPost = await apiManager.post.getLastPost();

      if (!latestPost) {
         return NextResponse.json(
            { error: "Nenhum post encontrado" },
            { status: 404 }
         );
      }

      return NextResponse.json(latestPost);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar o último post" },
         { status: 500 }
      );
   }
}
