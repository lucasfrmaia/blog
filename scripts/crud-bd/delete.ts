import { apiManager } from "@/services/modules/ApiManager";

async function deleteData() {
   try {
      // Deletar comentários primeiro (devido às relações)
      console.log("Deletando comentários...");
      const comments = await apiManager.comment.findAll();
      for (const comment of comments) {
         await apiManager.comment.delete(comment.id);
      }

      // Deletar posts
      console.log("Deletando posts...");
      const posts = await apiManager.post.findAll();
      for (const post of posts) {
         await apiManager.post.delete(post.id);
      }

      // Deletar categorias
      console.log("Deletando categorias...");
      const categories = await apiManager.category.findAll();
      for (const category of categories) {
         await apiManager.category.delete(category.id);
      }

      // Deletar usuários
      console.log("Deletando usuários...");
      const users = await apiManager.user.findAll();
      for (const user of users) {
         if (user?.role?.id !== "admin") {
            await apiManager.user.delete(user.id);
         }
      }

      console.log("Dados deletados com sucesso!");

      // Verificar estado final
      console.log("\n=== Estado Final do Banco ===");

      const remainingUsers = await apiManager.user.findAll();
      console.log("Usuários restantes:", remainingUsers.length);

      const remainingPosts = await apiManager.post.findAll();
      console.log("Posts restantes:", remainingPosts.length);

      const remainingCategories = await apiManager.category.findAll();
      console.log("Categorias restantes:", remainingCategories.length);

      const remainingComments = await apiManager.comment.findAll();
      console.log("Comentários restantes:", remainingComments.length);
   } catch (error) {
      console.error("Erro ao deletar dados:", error);
   }
}

deleteData();
