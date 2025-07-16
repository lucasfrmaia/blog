export const ROUTES_PAGE = {
   home: {
      link: '/',
      label: 'Home',
   },
   blog: {
      link: '/posts',
      label: 'Posts',
   },
   about: {
      link: '/about',
      label: 'Sobre',
   },
   contact: {
      link: '/contact',
      label: 'Contato',
   },
   login: {
      link: '/login',
      label: 'Login',
   },
   register: {
      link: '/register',
      label: 'Registro',
   },
   recovery: {
      link: '/recovery',
      label: 'Recuperar Senha',
   },
   dashboard: {
      link: '/dashboard',
      label: 'Dashboard',
   },
   profile: {
      link: '/profile',
      label: 'Perfil',
   },
   termsOfUse: {
      link: '/terms',
      label: 'Termos de Uso',
   },
   privacyPolicy: {
      link: '/privacy-policy',
      label: 'Política de Privacidade',
   },
   cookiePolicy: {
      link: '/cookie-policy',
      label: 'Política de Cookies',
   },
} as const;

export const NAVEBAR_ROUTES = {
   blog: ROUTES_PAGE.blog,
   about: ROUTES_PAGE.about,
   contact: ROUTES_PAGE.contact,
} as const;

export const PROTECTED_ROUTES = [
   ROUTES_PAGE.dashboard.link,
   ROUTES_PAGE.profile.link,
] as const;
