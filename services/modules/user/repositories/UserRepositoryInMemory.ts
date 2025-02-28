import { IUser } from "../entities/user";
import { IUserRepository } from "./UserRepository";

export class UserRepositoryInMemory implements IUserRepository {
   private users: IUser[] = [
      {
         id: "1",
         name: "Admin",
         email: "admin@admin.com",
         password: "admin",
         salt: "admin",
         createdAt: new Date(),
         updatedAt: new Date(),
         role: [],
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

   async findById(id: string): Promise<IUser | null> {
      const user = this.users.find((u) => u.id === id);
      return user || null;
   }

   async findAll(): Promise<IUser[]> {
      return this.users;
   }

   async findPerPage(
      page: number,
      limit: number
   ): Promise<{ users: IUser[]; total: number }> {
      const start = (page - 1) * limit;
      const end = start + limit;
      return {
         users: this.users.slice(start, end),
         total: this.users.length,
      };
   }

   async update(user: IUser): Promise<void> {
      const index = this.users.findIndex((u) => u.email === user.email);
      if (index !== -1) {
         this.users[index] = user;
      }
   }
}
