import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/prisma/lib/prisma';
import { NextAuthOptions } from '@/app/api/auth/auth-options';

export async function POST(
   request: Request,
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

      const { userId, reaction } = await request.json();

      if (!userId) {
         return NextResponse.json(
            { message: 'Dados inválidos: userId ausente' },
            { status: 400 },
         );
      }

      const comment = await prisma.comment.findUnique({
         where: { id: params.id },
         include: {
            likes: true,
         },
      });

      if (!comment) {
         return NextResponse.json(
            { message: 'Comentário não encontrado' },
            { status: 404 },
         );
      }

      const existingReaction = await prisma.likeComment.findUnique({
         where: {
            commentId_userId: {
               commentId: params.id,
               userId: session.user.id,
            },
         },
      });

      if (existingReaction) {
         if (!reaction || existingReaction.type === reaction) {
            // mesma reação ou reaction = null → remove
            await prisma.likeComment.delete({
               where: {
                  commentId_userId: {
                     commentId: params.id,
                     userId: session.user.id,
                  },
               },
            });
         } else {
            // reação diferente → atualiza
            await prisma.likeComment.update({
               where: {
                  commentId_userId: {
                     commentId: params.id,
                     userId: session.user.id,
                  },
               },
               data: {
                  type: reaction,
               },
            });
         }
      } else if (reaction) {
         // nova reação
         await prisma.likeComment.create({
            data: {
               commentId: params.id,
               userId: session.user.id,
               type: reaction,
            },
         });
      }

      const updatedComment = await prisma.comment.findUnique({
         where: { id: params.id },
         include: {
            likes: true,
         },
      });

      const likes =
         updatedComment?.likes.filter((like) => like.type === 'like').length ??
         0;
      const deslikes =
         updatedComment?.likes.filter((like) => like.type === 'deslike')
            .length ?? 0;

      return NextResponse.json({
         likes,
         deslikes,
      });
   } catch (error) {
      console.error('Erro ao processar reação:', error);
      return NextResponse.json(
         { message: 'Erro ao processar reação' },
         { status: 500 },
      );
   }
}
