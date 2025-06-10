'use client';

import { motion } from 'framer-motion';
import BaseLayout from '../_components/layout/BaseLayout';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '../_components/ui/card';

export default function PrivacyPolicyPage() {
   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <Card>
                  <CardHeader>
                     <CardTitle className="text-3xl font-bold text-center">
                        Política de Privacidade
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           1. Informações Coletadas
                        </h2>
                        <p>
                           Coletamos as seguintes informações quando você usa
                           nosso blog:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                           <li>Nome e endereço de e-mail ao criar uma conta</li>
                           <li>Informações de uso e navegação</li>
                           <li>Cookies e dados de rastreamento</li>
                           <li>Comentários e interações com o conteúdo</li>
                        </ul>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           2. Uso das Informações
                        </h2>
                        <p>Utilizamos suas informações para:</p>
                        <ul className="list-disc pl-6 mt-2">
                           <li>
                              Gerenciar sua conta e fornecer nossos serviços
                           </li>
                           <li>Melhorar a experiência do usuário</li>
                           <li>
                              Enviar atualizações e newsletters (com seu
                              consentimento)
                           </li>
                           <li>Analisar o uso do site e tendências</li>
                        </ul>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           3. Proteção de Dados
                        </h2>
                        <p>
                           Implementamos medidas de segurança para proteger suas
                           informações pessoais contra acesso não autorizado,
                           alteração, divulgação ou destruição.
                        </p>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           4. Compartilhamento de Dados
                        </h2>
                        <p>
                           Não vendemos ou compartilhamos suas informações
                           pessoais com terceiros, exceto:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                           <li>Com seu consentimento explícito</li>
                           <li>Para cumprir obrigações legais</li>
                           <li>
                              Com provedores de serviços que nos ajudam a operar
                              o blog
                           </li>
                        </ul>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           5. Seus Direitos
                        </h2>
                        <p>Você tem direito a:</p>
                        <ul className="list-disc pl-6 mt-2">
                           <li>Acessar seus dados pessoais</li>
                           <li>Corrigir informações imprecisas</li>
                           <li>Solicitar a exclusão de seus dados</li>
                           <li>Retirar seu consentimento a qualquer momento</li>
                        </ul>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           6. Alterações na Política
                        </h2>
                        <p>
                           Podemos atualizar esta política periodicamente.
                           Notificaremos você sobre alterações significativas
                           através de um aviso em nosso blog.
                        </p>
                     </section>

                     <section>
                        <h2 className="text-2xl font-semibold mb-4">
                           7. Contato
                        </h2>
                        <p>
                           Para questões sobre nossa política de privacidade ou
                           suas informações pessoais, entre em contato conosco
                           através da página de contato.
                        </p>
                     </section>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </BaseLayout>
   );
}
