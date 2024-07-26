import { IPost } from "../entities/Post";

export interface IPostManager {
   create(note: IPost): Promise<void>;
   update(post: IPost): Promise<void>;
   findById(id: string): Promise<IPost | null>;
   findAll(amount: number): Promise<IPost[]>;
   getLastPost(): Promise<IPost>;
   findPerPage(data: { amountPerPage: number; page: number }): Promise<IPost[]>;
   findPopular(amount: number): Promise<IPost[]>;
   delete(id: string): Promise<void>;
}
