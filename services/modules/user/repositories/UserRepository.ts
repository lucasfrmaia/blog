import { IUser } from "../entities/user";

export interface IUserRepository {
   authenticate(email?: string, password?: string): Promise<IUser>;
   create(user: IUser): Promise<void>;
}
