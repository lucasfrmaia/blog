import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "../../auth/auth-options";
import { ADMIN_ROLE_ID } from "@/utils/constantes/constants";

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
export async function PATCH(
   req: Request,
   { params }: { params: { commentId: string } }
) {
   try {
      const session = await getServerSession(NextAuthOptions);

      if (!session?.user) {
         return NextResponse.json(
            { message: "Não autorizado" },
            { status: 401 }
         );
      }

      const { content } = await req.json();
      const { commentId } = params;

      const comment = await apiManager.comment.findById(commentId);

      if (!comment) {
         return NextResponse.json(
            { message: "Comentário não encontrado" },
            { status: 404 }
         );
      }

      if (comment.userId !== session.user.id) {
         return NextResponse.json(
            { message: "Você não tem permissão para editar este comentário" },
            { status: 403 }
         );
      }

      const updatedComment = await apiManager.comment.update({
         id: commentId,
         content: content,
      });

      return NextResponse.json(updatedComment);
   } catch (error) {
      console.error("Erro ao editar comentário:", error);
      return NextResponse.json(
         { message: "Erro ao editar comentário" },
         { status: 500 }
      );
   }
}

// Excluir comentário
export async function DELETE(
   request: Request,
   { params }: { params: { id: string } }
) {
   try {
      const session = await getServerSession(NextAuthOptions);

      if (!session) {
         return NextResponse.json(
            { message: "Não autorizado" },
            { status: 401 }
         );
      }

      const comment = await apiManager.comment.findById(params.id);

      if (!comment) {
         return NextResponse.json(
            { message: "Comentário não encontrado" },
            { status: 404 }
         );
      }

      // Verifica se o usuário é o dono do comentário ou é admin
      if (
         comment.user?.id !== session.user?.id &&
         session.user?.role !== ADMIN_ROLE_ID
      ) {
         return NextResponse.json(
            { message: "Não autorizado" },
            { status: 403 }
         );
      }

      await apiManager.comment.delete(params.id);

      return NextResponse.json(
         { message: "Comentário deletado com sucesso" },
         { status: 200 }
      );
   } catch (error) {
      console.error("Erro ao deletar comentário:", error);
      return NextResponse.json(
         { message: "Erro ao deletar comentário" },
         { status: 500 }
      );
   }
}
