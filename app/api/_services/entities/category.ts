import { IPost } from './Post';
import { Category } from '@prisma/client';

export type ICategory = Category & {
   posts?: IPost[];
};

export type ICategoryUpdate = Partial<
   Pick<Category, 'name' | 'description' | 'color'>
> &
   Pick<Category, 'id'>;

export type ICategoryCreate = Omit<Category, 'id' | 'updatedAt' | 'createdAt'>;
