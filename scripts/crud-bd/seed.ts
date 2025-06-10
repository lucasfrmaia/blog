import { apiManager } from '@/services/modules/ApiManager';

async function seed() {
   try {
      // Criar roles
      console.log('Criando roles...');
      await apiManager.role.create({
         name: 'admin',
         description: 'Administrador do sistema',
      });
      await apiManager.role.create({
         name: 'user',
         description: 'Usuário comum',
      });

      // Criar usuários
      console.log('Criando usuários...');
      await apiManager.user.create({
         name: 'Admin',
         email: 'admin@example.com',
         password: 'admin123',
      });
      await apiManager.user.create({
         name: 'User',
         email: 'user@example.com',
         password: 'user123',
      });

      // Criar categorias
      console.log('Criando categorias...');
      await apiManager.category.create({
         name: 'Tecnologia',
         color: '#FF5733',
      });
      await apiManager.category.create({
         name: 'Programação',
         color: '#33FF57',
      });

      // Criar posts
      console.log('Criando posts...');
      await apiManager.post.create({
         title: 'Primeiro Post',
         description: 'Descrição do primeiro post',
         content: 'Conteúdo do primeiro post',
         authorId: '1', // ID do admin
         categoryId: ['1'], // ID da categoria Tecnologia
      });

      // Criar comentários
      console.log('Criando comentários...');
      await apiManager.comment.create({
         content: 'Ótimo post!',
         userId: '2', // ID do usuário comum
         postId: '1', // ID do primeiro post
      });

      console.log('Dados inseridos com sucesso!');
   } catch (error) {
      console.error('Erro ao inserir dados:', error);
   }
}

seed();
