import { Role } from "@prisma/client";
import { IUser } from "./user";

export type IRole = Role & {
   users?: IUser[];
};

export type IRoleCreate = Pick<Role, "name" | "description">;

export type IRoleUpdate = Partial<Pick<Role, "name" | "description">> &
   Pick<Role, "id">;
