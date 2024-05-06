export interface IUser {
   id: string;
   name?: string | null;
   email: string;
   image?: string | null;
}

export interface ICategory {
   id: string;
   slug: string;
   title: string;
   img?: string | null;
   color: string;
}

export interface IPost {
   id: string;
   createdAt: Date;
   updateAt: Date;
   slug: string;
   title: string;
   description: string;
   img?: string | null;
   views: number;
   catSlug: string;
   userEmail: string;
   categories: ICategory[];
}

export interface IComment {
   id: string;
   createdAt: Date;
   description: string;
   userEmail: string;
   postSlug: string;
}
