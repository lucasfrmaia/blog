import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
   params: {
      id: string;
   };
}

// Buscar comentário por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const comment = await apiManager.comment.findById(id);

      if (!comment) {
         return NextResponse.json(
            { error: "Comentário não encontrado" },
            { status: 404 }
         );
      }

      return NextResponse.json(comment);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar comentário" },
         { status: 500 }
      );
   }
}

// Atualizar comentário
export async function PATCH(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const body = await request.json();

      await apiManager.comment.update({
         id,
         ...body,
      });

      return NextResponse.json({
         message: "Comentário atualizado com sucesso",
      });
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao atualizar comentário" },
         { status: 500 }
      );
   }
}

// Excluir comentário
export async function DELETE(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      await apiManager.comment.delete(id);

      return NextResponse.json({ message: "Comentário excluído com sucesso" });
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao excluir comentário" },
         { status: 500 }
      );
   }
}
