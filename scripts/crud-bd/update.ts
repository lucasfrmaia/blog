import { apiManager } from '@/services/modules/ApiManager';

async function updateData() {
   try {
      // Atualizar usuário
      console.log('Atualizando usuário...');
      await apiManager.user.update({
         id: '1',
         name: 'Admin Atualizado',
         email: 'admin.updated@example.com',
      });

      // Atualizar categoria
      console.log('Atualizando categoria...');
      await apiManager.category.update({
         id: '1',
         name: 'Tecnologia Atualizada',
         color: '#FF0000',
      });

      // Atualizar post
      console.log('Atualizando post...');
      await apiManager.post.update({
         id: '1',
         title: 'Post Atualizado',
         content: 'Conteúdo atualizado do post',
         categoryId: ['1', '2'], // Adicionar mais categorias
      });

      // Atualizar comentário
      console.log('Atualizando comentário...');
      await apiManager.comment.update({
         id: '1',
         content: 'Comentário atualizado!',
      });

      console.log('Dados atualizados com sucesso!');

      // Verificar atualizações
      console.log('\n=== Verificando Atualizações ===');

      const user = await apiManager.user.findById('1');
      console.log('Usuário atualizado:', user);

      const category = await apiManager.category.findById('1');
      console.log('Categoria atualizada:', category);

      const post = await apiManager.post.findById('1');
      console.log('Post atualizado:', post);

      const comment = await apiManager.comment.findById('1');
      console.log('Comentário atualizado:', comment);
   } catch (error) {
      console.error('Erro ao atualizar dados:', error);
   }
}

updateData();
