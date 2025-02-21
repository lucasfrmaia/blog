import { prisma } from "@/services/lib/prisma";
import { IComment, ICommentCreate, ICommentUpdate } from "../entities/comment";
import { ICommentRepository } from "./CommentRepository";

export class CommentRepositoryPrisma implements ICommentRepository {
   async create(data: ICommentCreate): Promise<void> {
      await prisma.comment.create({
         data: {
            content: data.content,
            userId: data.userId,
            postId: data.postId,
         },
      });
   }

   async update(data: ICommentUpdate): Promise<void> {
      await prisma.comment.update({
         where: { id: data.id },
         data: {
            content: data.content,
         },
      });
   }

   async findById(id: number): Promise<IComment | null> {
      const comment = await prisma.comment.findUnique({
         where: { id },
         include: {
            user: true,
            post: true,
         },
      });

      if (!comment) return null;

      return {
         id: comment.id,
         content: comment.content,
         createdAt: comment.createdAt,
         updatedAt: comment.updatedAt,
         userId: comment.userId,
         postId: comment.postId,
         user: comment.user,
         post: comment.post,
      };
   }

   async findByPostId(postId: number): Promise<IComment[]> {
      const comments = await prisma.comment.findMany({
         where: {
            postId,
         },
         include: {
            user: true,
            post: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      return comments.map((comment) => ({
         id: comment.id,
         content: comment.content,
         createdAt: comment.createdAt,
         updatedAt: comment.updatedAt,
         userId: comment.userId,
         postId: comment.postId,
         user: comment.user,
         post: comment.post,
      }));
   }

   async findAll(): Promise<IComment[]> {
      const comments = await prisma.comment.findMany({
         include: {
            user: true,
            post: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      return comments.map((comment) => ({
         id: comment.id,
         content: comment.content,
         createdAt: comment.createdAt,
         updatedAt: comment.updatedAt,
         userId: comment.userId,
         postId: comment.postId,
         user: comment.user,
         post: comment.post,
      }));
   }

   async delete(id: number): Promise<void> {
      await prisma.comment.delete({
         where: { id },
      });
   }
}
