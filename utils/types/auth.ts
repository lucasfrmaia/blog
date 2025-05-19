export type AuthUser = {
   id: string;
   name: string;
   email: string;
   role: number;
   image?: string | null;
};

export type LoginCredentials = {
   email: string;
   password: string;
};

export type Session = {
   user: AuthUser;
   expires: string;
};
