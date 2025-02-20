export interface IUser {
   id: string;
   name?: string | null;
   email: string;
   image?: string | null;
   role?: "admin" | "user";
}
