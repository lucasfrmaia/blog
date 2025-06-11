import { Comment, LikeComment } from '@prisma/client';
import { IUser } from './user';
import { IPost } from './Post';

export type IComment = Comment & {
   replies?: IComment[];
   user?: IUser;
   post?: IPost;
   likes?: LikeComment[];
};

export type ITypeLike = 'like' | 'deslike';

export type ICommentCreate = Pick<
   Comment,
   'content' | 'userId' | 'postId' | 'parentId'
>;

export type ICommentUpdate = Partial<Pick<Comment, 'content'>> &
   Pick<Comment, 'id'>;
