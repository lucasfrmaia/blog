import { prisma } from "@/services/lib/prisma";
import { IUser, IUserCreate, IUserUpdate } from "../entities/user";
import { IUserRepository } from "./UserRepository";
import { hash, compare, genSalt } from "bcryptjs";

export class UserRepositoryPrisma implements IUserRepository {
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
            posts: true,
            comments: true,
         },
      });

      if (!user) {
         throw new Error("Usuário não encontrado");
      }

      const isValidPassword = await compare(password, user.password);
      if (!isValidPassword) {
         throw new Error("Senha inválida");
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

   async update(data: IUserUpdate): Promise<void> {
      const updateData: any = { ...data };

      if (data.password) {
         const salt = await genSalt(10);
         const hashedPassword = await hash(data.password, salt);
         updateData.password = hashedPassword;
         updateData.salt = salt;
      }

      await prisma.user.update({
         where: { id: data.id },
         data: updateData,
      });
   }
}
