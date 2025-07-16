import { prisma } from '@/prisma/lib/prisma';
import { IComment, ICommentCreate, ICommentUpdate } from '../entities/comment';
import { ICommentRepository } from '../interfaces/CommentRepository';
import { BaseRepository } from './BaseRepository';

export class CommentRepositoryPrisma
   extends BaseRepository
   implements ICommentRepository
{
   async create(data: ICommentCreate): Promise<IComment> {
      return await prisma.comment.create({
         data: {
            content: data.content,
            userId: data.userId,
            postId: data.postId,
            parentId: data.parentId,
         },
         include: {
            user: this.userSelectProps,
            likes: true,
         },
      });
   }

   async update(data: ICommentUpdate): Promise<void> {
      await prisma.comment.update({
         where: { id: data.id },
         data: {
            content: data.content,
            edited: true,
         },
      });
   }

   async findById(id: string): Promise<IComment | null> {
      const comment = await prisma.comment.findUnique({
         where: { id },
         include: {
            user: this.userSelectProps,
            replies: {
               include: {
                  user: this.userSelectProps,
                  likes: true,
               },
            },
            likes: true,
         },
      });

      return comment;
   }

   async findByPostId(postId: string): Promise<IComment[]> {
      const comments = await prisma.comment.findMany({
         where: {
            postId,
         },
         include: {
            user: this.userSelectProps,
            post: true,
            replies: {
               orderBy: {
                  createdAt: 'asc',
               },
               include: {
                  user: this.userSelectProps,
                  likes: true,
               },
            },
            likes: true,
         },
         orderBy: {
            createdAt: 'asc',
         },
      });

      return comments;
   }

   async findByUserId(userId: string): Promise<IComment[]> {
      const comments = await prisma.comment.findMany({
         where: {
            userId,
         },
         include: {
            user: this.userSelectProps,
            post: true,
            likes: true,
         },
         orderBy: {
            createdAt: 'desc',
         },
      });

      return comments;
   }

   async findAll(): Promise<IComment[]> {
      const comments = await prisma.comment.findMany({
         include: {
            user: this.userSelectProps,
            post: true,
            likes: true,
         },
         orderBy: {
            createdAt: 'desc',
         },
      });

      return comments;
   }

   async delete(id: string): Promise<void> {
      await prisma.comment.delete({
         where: { id },
      });
   }
}
