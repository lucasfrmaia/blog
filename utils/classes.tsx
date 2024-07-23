import { comment } from "postcss";

class GlobalUtils {
   public readonly apiRoutes;
   public readonly routes;

   constructor() {
      this.apiRoutes = {
         comment: `http://localhost:3000/api/comments`,
         categories: {
            all: `http://localhost:3000/api/categories/all`,
            popular: `http://localhost:3000/api/categories/popular`,
         },
         posts: {
            default: `http://localhost:3000/api/posts`,
            recent: `http://localhost:3000/api/posts/recent`,
            popular: `http://localhost:3000/api/posts/popular`,
         },
      };
      this.routes = {
         home: {
            link: "/",
            label: "Início",
         },
         posts: {
            link: "/posts",
            label: "Posts",
         },
         contact: {
            link: "/",
            label: "Contato",
         },
         about: {
            link: "/",
            label: "Sobre",
         },
      };
   }
}

export const globalUtils = new GlobalUtils();
