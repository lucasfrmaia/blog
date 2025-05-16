import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();

      // Verificar se os campos obrigatórios estão presentes
      if (!body.name || !body.color) {
         return NextResponse.json(
            { error: "Nome e cor são campos obrigatórios" },
            { status: 400 }
         );
      }

      await apiManager.category.create({
         name: body.name,
         color: body.color,
      });

      return NextResponse.json(
         { message: "Categoria criada com sucesso" },
         { status: 201 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: `Erro ao criar categoria ${(error as Error).message}` },
         { status: 500 }
      );
   }
}
