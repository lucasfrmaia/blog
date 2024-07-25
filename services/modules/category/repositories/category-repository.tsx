import { ICategory } from "../entities/category";

export interface ICategoryManager {
   create(note: ICategory): Promise<void>;
   update(category: ICategory): Promise<void>;
   findById(id: string): Promise<ICategory | null>;
   findAll(): Promise<ICategory[]>;
   delete(id: string): Promise<void>;
}
