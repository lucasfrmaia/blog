import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
   params: {
      id: string;
   };
}

// Buscar post por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const post = await apiManager.post.findById(id);

      if (!post) {
         return NextResponse.json(
            { error: "Post não encontrado" },
            { status: 404 }
         );
      }

      return NextResponse.json(post);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar post" },
         { status: 500 }
      );
   }
}

// Atualizar post
export async function PATCH(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const body = await request.json();

      await apiManager.post.update({
         id,
         ...body,
      });

      return NextResponse.json({ message: "Post atualizado com sucesso" });
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao atualizar post" },
         { status: 500 }
      );
   }
}

// Excluir post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      await apiManager.post.delete(id);

      return NextResponse.json({ message: "Post excluído com sucesso" });
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao excluir post" },
         { status: 500 }
      );
   }
}
