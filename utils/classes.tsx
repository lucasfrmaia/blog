import { comment } from "postcss";

class GlobalUtils {
   public readonly apiRoutes;
   public readonly baseUrlApi;
   public readonly routes;

   constructor() {
      (this.baseUrlApi = process.env.BASE_URL_API),
         (this.apiRoutes = {
            comment: `${this.baseUrlApi}/comments`,
            categories: {
               all: `${this.baseUrlApi}/categories/all`,
               popular: `${this.baseUrlApi}/categories/popular`,
            },
            posts: {
               default: `${this.baseUrlApi}/posts`,
               recent: `${this.baseUrlApi}/posts/recent`,
               popular: `${this.baseUrlApi}/posts/popular`,
            },
         });
      this.routes = {
         home: {
            link: "/",
            label: "Início",
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
