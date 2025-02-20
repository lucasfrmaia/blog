import { IUser } from "../entities/user";
import { IUserRepository } from "./UserRepository";

export class UserRepositoryInMemory implements IUserRepository {
   private users: IUser[] = [
      {
         id: "1",
         name: "Admin",
         email: "admin@admin.com",
         image: "https://github.com/shadcn.png",
         role: "admin" as const,
      },
   ];

   async create(user: IUser): Promise<void> {
      this.users.push(user);
   }

   async authenticate(email?: string, password?: string): Promise<IUser> {
      // Para fins de teste, vamos aceitar qualquer senha para o admin
      if (email === "admin@admin.com") {
         return this.users[0];
      }

      const user = this.users.find((u) => u.email === email);

      if (!user) {
         throw new Error("User not found");
      }

      return user;
   }

   async findByEmail(email: string): Promise<IUser | null> {
      const user = this.users.find((u) => u.email === email);
      return user || null;
   }

   async update(user: IUser): Promise<void> {
      const index = this.users.findIndex((u) => u.email === user.email);
      if (index !== -1) {
         this.users[index] = user;
      }
   }
}
