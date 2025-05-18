import { Prisma, User } from "@prisma/client";
import { IUser, IUserCreate, IUserUpdate } from "../entities/user";
import { hash, compare, genSalt } from "bcryptjs";
import { IUserRepository } from "./UserRepository";
import { prisma } from "../../../../../../prisma/lib/prisma";

export class UserRepositoryPrisma implements IUserRepository {
   async findById(id: string): Promise<IUser | null> {
      const user = await prisma.user.findUnique({
         where: { id },
         include: { role: true, posts: true, comments: true },
      });
      return user as User;
   }

   async findAll(): Promise<IUser[]> {
      const users = await prisma.user.findMany({
         include: { role: true, posts: true, comments: true },
      });
      return users as User[];
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ users: IUser[]; total: number }> {
      const [users, total] = await Promise.all([
         prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: { role: true, posts: true, comments: true },
            orderBy: { createdAt: "desc" },
         }),
         prisma.user.count(),
      ]);

      return { users: users as User[], total };
   }

   async create(data: IUserCreate): Promise<void> {
      const salt = await genSalt(10);
      const passwordString =
         typeof data.password === "string" ? data.password : "";
      if (!passwordString) {
         throw new Error("Senha é obrigatória.");
      }
      const hashedPassword = await hash(passwordString, salt);

      const roleId = data.roleId;

      if (!roleId) {
         throw new Error(
            "Role ID é obrigatório via 'role: { connect: { id: ... } }'"
         );
      }

      const user = await prisma.user.create({
         data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            salt,
            roleId: roleId,
         },
         include: { role: true },
      });
   }

   async authenticate(email: string, password: string): Promise<IUser> {
      const user = await prisma.user.findUnique({
         where: { email },
         include: { role: true },
      });

      if (!user) {
         throw new Error("Usuário não encontrado");
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
         throw new Error("Senha incorreta");
      }

      return user as User;
   }

   async findByEmail(email: string): Promise<IUser | null> {
      const user = await prisma.user.findUnique({
         where: { email },
         include: { role: true, posts: true, comments: true },
      });
      return user as User;
   }

   async findByRoleId(roleId: number): Promise<IUser[]> {
      const users = await prisma.user.findMany({
         where: { roleId },
         include: { role: true, posts: true, comments: true },
      });
      return users as User[];
   }

   async update(data: IUserUpdate): Promise<void> {
      const updateData: IUserUpdate = {
         id: data.id,
      };

      if (data.name) updateData.name = data.name;
      if (data.email) updateData.email = data.email;

      if (typeof data.password === "string") {
         const salt = await genSalt(10);
         updateData.password = await hash(data.password, salt);
      }
   }

   async delete(id: string): Promise<void> {
      await prisma.$transaction(async (tx) => {
         await tx.comment.deleteMany({ where: { userId: id } });
         await tx.post.deleteMany({ where: { authorId: id } });
         await tx.user.delete({ where: { id } });
      });
   }
}
