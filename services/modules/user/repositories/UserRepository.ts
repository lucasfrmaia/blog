import { IUser, IUserCreate, IUserUpdate } from "../entities/user";

export interface IUserRepository {
   create(data: IUserCreate): Promise<void>;
   update(data: IUserUpdate): Promise<void>;
   findByEmail(email: string): Promise<IUser | null>;
   authenticate(email: string, password: string): Promise<IUser>;
}
