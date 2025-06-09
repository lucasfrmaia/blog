import { User } from "@prisma/client";
import { IComment } from "./comment";
import { IPost } from "./Post";
import { IRole } from "./role";

export type IUser = User & {
   role?: IRole;
   posts?: IPost[];
   comments?: IComment[];
};

export type IUserCreate = Pick<User, "name" | "email" | "password" | "roleId">;

export type IUserUpdate = Partial<
   Pick<User, "name" | "email" | "password" | "roleId">
> &
   Pick<User, "id">;
