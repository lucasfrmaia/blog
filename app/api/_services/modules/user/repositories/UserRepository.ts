import { IUser, IUserCreate, IUserUpdate } from "../entities/user";

export interface IUserRepository {
   create(data: IUserCreate): Promise<void>;
   update(data: IUserUpdate): Promise<void>;
   delete(id: string): Promise<void>;
   findByEmail(email: string): Promise<IUser | null>;
   findById(id: string): Promise<IUser | null>;
   findAll(): Promise<IUser[]>;
   findByRoleId(roleId: number): Promise<IUser[]>;
   findPerPage(
      page: number,
      limit: number
   ): Promise<{ users: IUser[]; total: number }>;
   authenticate(email: string, password: string): Promise<IUser>;
}
