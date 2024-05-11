import { comment } from "postcss";

class GlobalUtils {
   public readonly apiRoutes: {};
   public readonly baseUrlApi;

   constructor() {
      (this.baseUrlApi = process.env.BASE_URL_API),
         (this.apiRoutes = {
            comment: `${this.baseUrlApi}/comments`,
            categories: {
               all: `${this.baseUrlApi}/categories/all`,
               popular: `${this.baseUrlApi}/categories/popular`,
            },
         });
   }
}

export const globalUtils = new GlobalUtils();
