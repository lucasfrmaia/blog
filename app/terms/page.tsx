"use client";

import { motion } from "framer-motion";
import BaseLayout from "@/components/layout/BaseLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfUsePage() {
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
                        Termos de Uso
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           1. Aceitação dos Termos
                        </h2>
                        <p>
                           Ao acessar e usar este blog, você concorda em cumprir
                           e estar vinculado a estes Termos de Uso. Se você não
                           concordar com qualquer parte destes termos, não
                           poderá acessar o site.
                        </p>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           2. Uso do Conteúdo
                        </h2>
                        <p>
                           Todo o conteúdo publicado neste blog é protegido por
                           direitos autorais. Você pode compartilhar e citar o
                           conteúdo, desde que forneça a devida atribuição e
                           link para a fonte original.
                        </p>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           3. Contas de Usuário
                        </h2>
                        <p>
                           Ao criar uma conta em nosso blog, você é responsável
                           por manter a confidencialidade de suas credenciais e
                           por todas as atividades que ocorrem em sua conta.
                        </p>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           4. Comentários e Interações
                        </h2>
                        <p>
                           Ao publicar comentários ou interagir com o conteúdo,
                           você concorda em:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                           <li>
                              Não publicar conteúdo ofensivo, difamatório ou
                              ilegal
                           </li>
                           <li>
                              Não fazer spam ou publicar conteúdo comercial não
                              solicitado
                           </li>
                           <li>Respeitar outros usuários e suas opiniões</li>
                        </ul>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           5. Limitação de Responsabilidade
                        </h2>
                        <p>
                           O blog não se responsabiliza por quaisquer danos
                           diretos, indiretos, incidentais ou consequenciais
                           resultantes do uso ou incapacidade de usar nossos
                           serviços.
                        </p>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           6. Modificações dos Termos
                        </h2>
                        <p>
                           Reservamos o direito de modificar estes termos a
                           qualquer momento. As alterações entrarão em vigor
                           imediatamente após sua publicação no blog.
                        </p>
                     </section>

                     <section>
                        <h2 className="text-2xl font-semibold mb-4">
                           7. Contato
                        </h2>
                        <p>
                           Se você tiver dúvidas sobre estes Termos de Uso,
                           entre em contato conosco através da página de
                           contato.
                        </p>
                     </section>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </BaseLayout>
   );
}
