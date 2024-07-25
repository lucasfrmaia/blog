import { IPost } from "@/app/(entities)/interfaces";

export interface IPostManager {
   create(note: IPost): Promise<void>;
   update(post: IPost): Promise<void>;
   findById(id: string): Promise<IPost | null>;
   findAll(): Promise<IPost[]>;
   delete(id: string): Promise<void>;
}
