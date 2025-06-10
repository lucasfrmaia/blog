import { apiManager } from '@/services/modules/ApiManager';

async function readData() {
   try {
      // Ler roles
      console.log('\n=== Roles ===');
      const roles = await apiManager.role.findAll();
      console.log(roles);

      // Ler usuários
      console.log('\n=== Usuários ===');
      const users = await apiManager.user.findAll();
      console.log(users);

      // Ler categorias
      console.log('\n=== Categorias ===');
      const categories = await apiManager.category.findAll();
      console.log(categories);

      // Ler posts
      console.log('\n=== Posts ===');
      const posts = await apiManager.post.findAll();
      console.log(posts);

      // Ler comentários
      console.log('\n=== Comentários ===');
      const comments = await apiManager.comment.findAll();
      console.log(comments);

      // Buscar dados específicos
      console.log('\n=== Dados Específicos ===');

      // Buscar post por ID
      const post = await apiManager.post.findById('1');
      console.log('Post #1:', post);

      // Buscar usuário por email
      const user = await apiManager.user.findByEmail('admin@example.com');
      console.log('Usuário admin:', user);

      // Buscar categorias populares
      const popularCategories =
         await apiManager.category.findPopularCategories(3);
      console.log('Categorias populares:', popularCategories);

      // Buscar comentários de um post
      const postComments = await apiManager.comment.findByPostId('1');
      console.log('Comentários do post #1:', postComments);
   } catch (error) {
      console.error('Erro ao ler dados:', error);
   }
}

readData();
