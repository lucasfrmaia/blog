interface User {
   id: string;
   name?: string | null;
   email: string;
   image?: string | null;
}

interface Category {
   id: string;
   slug: string;
   title: string;
   img?: string | null;
   color: string;
}

interface Post {
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
}

interface Comment {
   id: string;
   createdAt: Date;
   description: string;
   userEmail: string;
   postSlug: string;
}
