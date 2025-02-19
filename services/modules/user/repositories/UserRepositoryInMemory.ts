import { IUser } from "../entities/user";
import { IUserRepository } from "./UserRepository";

export class UserRepositoryInMemory implements IUserRepository {
   private users: IUser[] = [];

   async create(user: IUser): Promise<void> {
      this.users.push(user);
   }

   async authenticate(email?: string, password?: string): Promise<IUser> {
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
