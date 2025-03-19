import { prisma } from "@/services/lib/prisma";
import { IUser, IUserCreate, IUserUpdate } from "../entities/user";
import { IUserRepository } from "./UserRepository";
import { hash, compare, genSalt } from "bcryptjs";

export class UserRepositoryPrisma implements IUserRepository {
   async findById(id: string): Promise<IUser | null> {
      const user = await prisma.user.findUnique({
         where: { id },
         include: {
            role: true,
            posts: true,
            comments: true,
         },
      });
      return user;
   }

   async findAll(): Promise<IUser[]> {
      const users = await prisma.user.findMany({
         include: {
            role: true,
            posts: true,
            comments: true,
         },
      });
      return users;
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ users: IUser[]; total: number }> {
      const [users, total] = await Promise.all([
         prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
               role: true,
               posts: true,
               comments: true,
            },
            orderBy: {
               createdAt: "desc",
            },
         }),
         prisma.user.count(),
      ]);

      return { users, total };
   }

   async create(data: IUserCreate): Promise<void> {
      const salt = await genSalt(10);
      const hashedPassword = await hash(data.password, salt);

      await prisma.user.create({
         data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            salt,
            role: {
               connect: { name: "user" },
            },
         },
      });
   }

   async authenticate(email: string, password: string): Promise<IUser> {
      const user = await prisma.user.findUnique({
         where: { email },
         include: {
            role: true,
         },
      });

      if (!user) {
         throw new Error("Usuário não encontrado");
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
         throw new Error("Senha incorreta");
      }

      return user;
   }

   async findByEmail(email: string): Promise<IUser | null> {
      const user = await prisma.user.findUnique({
         where: { email },
         include: {
            role: true,
            posts: true,
            comments: true,
         },
      });
      return user;
   }

   async findByRoleId(roleId: string): Promise<IUser[]> {
      const users = await prisma.user.findMany({
         where: {
            roleId,
         },
         include: {
            role: true,
            posts: true,
            comments: true,
         },
      });
      return users;
   }

   async update(data: IUserUpdate): Promise<void> {
      const updateData: any = {
         name: data.name,
         email: data.email,
      };

      if (data.password) {
         const salt = await genSalt(10);
         updateData.password = await hash(data.password, salt);
         updateData.salt = salt;
      }

      await prisma.user.update({
         where: { id: data.id },
         data: updateData,
      });
   }
}
