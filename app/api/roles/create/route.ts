import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();

      // Verificar se os campos obrigatórios estão presentes
      if (!body.name || !body.description) {
         return NextResponse.json(
            { error: "Nome e descrição são campos obrigatórios" },
            { status: 400 }
         );
      }

      const newRole = await apiManager.role.create({
         name: body.name,
         description: body.description,
      });

      return NextResponse.json(
         { message: "Função criada com sucesso", role: newRole?.name },
         { status: 201 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao criar função: " + (error as Error).message },
         { status: 500 }
      );
   }
}
