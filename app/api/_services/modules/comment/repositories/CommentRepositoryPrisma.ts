import { prisma } from "../../../../../../prisma/lib/prisma";
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

   async findById(id: string): Promise<IComment | null> {
      const comment = await prisma.comment.findUnique({
         where: { id },
         include: {
            user: true,
            post: true,
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
            user: true,
            post: true,
         },
         orderBy: {
            createdAt: "desc",
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
            user: true,
            post: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      return comments;
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

      return comments;
   }

   async delete(id: string): Promise<void> {
      await prisma.comment.delete({
         where: { id },
      });
   }
}
