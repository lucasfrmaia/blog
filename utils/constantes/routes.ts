export const NAVEBAR_ROUTES = {
   home: {
      link: "/",
      label: "Início",
   },
   posts: {
      link: "/posts",
      label: "Posts",
   },
   contact: {
      link: "/contact",
      label: "Contato",
   },
   about: {
      link: "/about",
      label: "Sobre",
   },
};

export const ROUTES_PAGE = {
   ...NAVEBAR_ROUTES,
   register: {
      link: "/register",
      label: "Cadastra-se",
   },
   termsOfUse: {
      link: "/terms-of-use",
      label: "Termos de Uso",
   },
   login: {
      link: "/login",
      label: "Login",
   },
   recovery: {
      link: "/recovery",
      label: "Esqueci minha senha",
   },
};
