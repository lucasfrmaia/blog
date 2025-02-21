import { prisma } from "@/services/lib/prisma";
import { IUser, IUserCreate, IUserUpdate } from "../entities/user";
import { IUserRepository } from "./UserRepository";
import { hash, genSalt } from "bcryptjs";

export class UserRepositoryPrisma implements IUserRepository {
   async create(data: IUserCreate): Promise<void> {
      const salt = await genSalt(10);
      const hashedPassword = await hash(data.password, salt);

      await prisma.user.create({
         data: {
            ...data,
            password: hashedPassword,
            salt,
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
         throw new Error("User not found");
      }

      const hashedPassword = await hash(password, user.salt);
      if (hashedPassword !== user.password) {
         throw new Error("Invalid password");
      }

      return user;
   }

   async findByEmail(email: string): Promise<IUser | null> {
      const user = await prisma.user.findUnique({
         where: { email },
         include: {
            role: true,
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
