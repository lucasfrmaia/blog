import { IUser } from "@/services/modules/user/entities/user";

export type AuthUser = IUser & {
   role: "admin" | "user";
};

export type LoginCredentials = {
   email: string;
   password: string;
};

export type Session = {
   user: AuthUser;
   expires: string;
};
