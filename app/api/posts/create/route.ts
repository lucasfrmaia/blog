import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();

      if (!body.title || !body.content || !body.authorId) {
         return NextResponse.json(
            { error: "Título, conteúdo e ID do autor são campos obrigatórios" },
            { status: 400 }
         );
      }

      await apiManager.post.create({
         title: body.title,
         description: body.description || "",
         content: body.content,
         authorId: body.authorId,
         img: body.img,
         categories: body.categories,
      });

      return NextResponse.json(
         { message: "Post criado com sucesso" },
         { status: 201 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: `Erro ao criar post: ${(error as Error).message}` },
         { status: 500 }
      );
   }
}
