import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
   params: {
      id: string;
   };
}

// Buscar função por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const role = await apiManager.role.findById(id);

      if (!role) {
         return NextResponse.json(
            { error: "Função não encontrada" },
            { status: 404 }
         );
      }

      return NextResponse.json(role);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar função" },
         { status: 500 }
      );
   }
}

// Atualizar função
export async function PATCH(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const body = await request.json();

      await apiManager.role.update({
         id,
         ...body,
      });

      return NextResponse.json({ message: "Função atualizada com sucesso" });
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao atualizar função" },
         { status: 500 }
      );
   }
}

// Excluir função
export async function DELETE(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      await apiManager.role.delete(id);

      return NextResponse.json({ message: "Função excluída com sucesso" });
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao excluir função" },
         { status: 500 }
      );
   }
}
