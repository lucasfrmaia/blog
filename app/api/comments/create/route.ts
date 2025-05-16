import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();

      // Verificar se os campos obrigatórios estão presentes
      if (!body.content || !body.userId || !body.postId) {
         return NextResponse.json(
            {
               error: "Conteúdo, ID do usuário e ID do post são campos obrigatórios",
            },
            { status: 400 }
         );
      }

      await apiManager.comment.create({
         content: body.content,
         userId: body.userId,
         postId: body.postId,
      });

      return NextResponse.json(
         { message: "Comentário criado com sucesso" },
         { status: 201 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao criar comentário" },
         { status: 500 }
      );
   }
}
