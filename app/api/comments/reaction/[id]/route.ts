import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from '@/app/api/auth/auth-options';
import { prisma } from '@/prisma/lib/prisma';

export async function POST(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const session = await getServerSession(NextAuthOptions);

      if (!session?.user?.id) {
         return NextResponse.json(
            { message: 'Usuário não autenticado' },
            { status: 401 },
         );
      }

      const { reaction: newReactionType } = await request.json(); // 'like', 'deslike', ou null/undefined para remover
      const userId = session.user.id;
      const commentId = params.id;

      // Todas as operações acontecem dentro de uma única transação atômica
      const updatedComment = await prisma.$transaction(async (tx) => {
         // 1. Descobrir se já existe uma reação do usuário para este comentário
         const existingReaction = await tx.likeComment.findUnique({
            where: {
               commentId_userId: {
                  commentId,
                  userId,
               },
            },
         });

         // Se a nova reação é a mesma que a antiga, o usuário está removendo a reação.
         const isRemovingReaction = existingReaction?.type === newReactionType;

         // 2. Definir os incrementos/decrementos dos contadores
         let likesIncrement = 0;
         let deslikesIncrement = 0;

         if (isRemovingReaction) {
            // Apenas decrementa a reação que está sendo removida
            if (existingReaction?.type === 'like') likesIncrement = -1;
            if (existingReaction?.type === 'deslike') deslikesIncrement = -1;
         } else {
            // Se havia uma reação antiga, primeiro revertemos a contagem dela
            if (existingReaction?.type === 'like') likesIncrement = -1;
            if (existingReaction?.type === 'deslike') deslikesIncrement = -1;

            // E então aplicamos a nova reação
            if (newReactionType === 'like') likesIncrement += 1;
            if (newReactionType === 'deslike') deslikesIncrement += 1;
         }

         // 3. Deleta qualquer reação antiga (é seguro deletar mesmo que não exista)
         await tx.likeComment.deleteMany({
            where: { commentId, userId },
         });

         // 4. Se a ação não for de remoção, cria a nova reação
         if (!isRemovingReaction && newReactionType) {
            await tx.likeComment.create({
               data: {
                  commentId,
                  userId,
                  type: newReactionType,
               },
            });
         }

         // 5. Atualiza os contadores no comentário em uma única operação
         const finalUpdatedComment = await tx.comment.update({
            where: { id: commentId },
            data: {
               likesCount: { increment: likesIncrement },
               deslikesCount: { increment: deslikesIncrement },
            },
         });

         return finalUpdatedComment;
      });

      return NextResponse.json({
         likes: updatedComment.likesCount,
         deslikes: updatedComment.deslikesCount,
      });
   } catch (error) {
      // O Prisma faz rollback da transação automaticamente em caso de erro
      console.error('Erro ao processar reação:', error);
      return NextResponse.json(
         { message: 'Erro ao processar reação' },
         { status: 500 },
      );
   }
}
