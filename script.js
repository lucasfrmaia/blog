const API_URL = 'http://localhost:3000/api/posts/create'; // Substitua pela URL correta da sua API
const authorId = 'b6dae9d8-b5e5-4ca3-9182-80dc79cbc2bc';

const categories = [
   {
      id: '35b0abaa-8b60-46ec-ae4d-e365f133f56e',
      title: 'Engenharia de Software',
   },
   { id: 'c93c6f39-94d8-44c3-b96a-87c79a12b410', title: 'Estrutura de Dados' },
   { id: '0a39a495-6eb1-4f1e-b47e-b2b2b12adecd', title: 'Grafos' },
   {
      id: '78310224-21be-45e6-8d6d-d7fd2e79c6a3',
      title: 'Introdução a Computação',
   },
   { id: 'b2b92a50-5034-4494-8bb6-b52a6529b77d', title: 'Matemática' },
];

const topicsByCategory = {
   'Engenharia de Software': [
      'Modelo em Cascata',
      'Engenharia de Requisitos',
      'Metodologias Ágeis',
      'DevOps',
      'Gerência de Configuração de Software',
   ],
   'Estrutura de Dados': [
      'Arrays e Listas',
      'Pilhas e Filas',
      'Árvores Binárias',
      'Tabelas Hash',
      'Grafos',
   ],
   Grafos: [
      'Introdução à Teoria dos Grafos',
      'Grafos Direcionados e Não Direcionados',
      'Algoritmo de Dijkstra',
      'Busca em Largura e Profundidade',
      'Aplicações de Grafos',
   ],
   'Introdução a Computação': [
      'História da Computação',
      'Arquitetura de Computadores',
      'Sistemas Operacionais',
      'Linguagens de Programação',
      'Algoritmos e Lógica de Programação',
   ],
   Matemática: [
      'Conjuntos e Operações',
      'Funções e Gráficos',
      'Probabilidade e Estatística',
      'Álgebra Linear',
      'Cálculo Diferencial e Integral',
   ],
};

// Função para gerar conteúdo HTML para cada post
const generatePostContent = (categoryTitle, topic) => {
   return `
    <h1>${topic}</h1>
    <p>Este artigo explora o tópico de <strong>${topic}</strong> dentro da disciplina de <em>${categoryTitle}</em>.</p>
    <p>Fornecemos uma visão geral, conceitos fundamentais e aplicações práticas relacionadas a ${topic}.</p>
    <p>Continue lendo para aprofundar seu entendimento sobre ${topic}.</p>
  `;
};

// Função para gerar posts
const generatePosts = () => {
   const posts = [];
   let sig = 1; // Parâmetro para garantir imagens únicas

   categories.forEach((category) => {
      const topics = topicsByCategory[category.title];
      topics.forEach((topic) => {
         const searchTerm = encodeURIComponent(topic);
         const imageUrl = `https://blog.unoeste.br/wp-content/uploads/2023/04/o-que-e-ciencia-da-computacao.jpg`;

         posts.push({
            title: `${topic} em ${category.title} - ${~~(Math.random() * 10)}`,
            description: `Explorando o tópico de ${topic} na disciplina de ${category.title}.`,
            content: generatePostContent(category.title, topic),
            authorId: authorId,
            img: imageUrl,
            categories: [category.id],
         });
      });
   });

   return posts;
};

// Função para criar posts via API
const createPosts = async () => {
   const posts = generatePosts();

   for (const post of posts) {
      try {
         const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               // Adicione outros cabeçalhos de autenticação, se necessário
            },
            body: JSON.stringify(post),
         });

         const contentType = response.headers.get('content-type');
         const text = await response.text();

         if (!response.ok) {
            console.error('Erro na resposta da API:', response.status, text);
            continue;
         }

         if (contentType && contentType.includes('application/json')) {
            const data = JSON.parse(text);
            console.log('Post criado com sucesso:', data.title);
         } else {
            console.error('Resposta não é JSON:', text);
         }
      } catch (error) {
         console.error('Erro na requisição:', error);
      }
   }
};

createPosts();
