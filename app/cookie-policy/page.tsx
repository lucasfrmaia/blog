"use client";

import { motion } from "framer-motion";
import BaseLayout from "../_components/layout/BaseLayout";
import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
} from "../_components/ui/card";

export default function CookiePolicyPage() {
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
                        Política de Cookies
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           1. O que são Cookies?
                        </h2>
                        <p>
                           Cookies são pequenos arquivos de texto que são
                           armazenados em seu dispositivo quando você visita
                           nosso blog. Eles nos ajudam a fornecer uma melhor
                           experiência de usuário e entender como nosso site é
                           utilizado.
                        </p>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           2. Tipos de Cookies que Utilizamos
                        </h2>
                        <div className="space-y-4">
                           <div>
                              <h3 className="text-xl font-medium mb-2">
                                 Cookies Essenciais
                              </h3>
                              <p>
                                 Necessários para o funcionamento básico do
                                 site, como autenticação e segurança.
                              </p>
                           </div>
                           <div>
                              <h3 className="text-xl font-medium mb-2">
                                 Cookies de Preferências
                              </h3>
                              <p>
                                 Armazenam suas preferências e configurações
                                 para melhorar sua experiência.
                              </p>
                           </div>
                           <div>
                              <h3 className="text-xl font-medium mb-2">
                                 Cookies Analíticos
                              </h3>
                              <p>
                                 Nos ajudam a entender como os visitantes
                                 interagem com nosso site.
                              </p>
                           </div>
                        </div>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           3. Como Gerenciar Cookies
                        </h2>
                        <p>
                           Você pode controlar e/ou excluir cookies conforme
                           desejar. Você pode:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                           <li>
                              Aceitar ou recusar cookies através do banner de
                              consentimento
                           </li>
                           <li>
                              Excluir todos os cookies já armazenados em seu
                              dispositivo
                           </li>
                           <li>
                              Configurar seu navegador para bloquear cookies
                           </li>
                        </ul>
                        <p className="mt-4">
                           Note que bloquear todos os cookies pode afetar o
                           funcionamento do site.
                        </p>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           4. Cookies de Terceiros
                        </h2>
                        <p>
                           Alguns cookies de terceiros podem ser definidos
                           quando você usa nosso blog:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                           <li>Google Analytics para análise de tráfego</li>
                           <li>
                              Redes sociais para compartilhamento de conteúdo
                           </li>
                           <li>
                              Serviços de publicidade para anúncios relevantes
                           </li>
                        </ul>
                     </section>

                     <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                           5. Atualizações da Política
                        </h2>
                        <p>
                           Esta política pode ser atualizada periodicamente para
                           refletir mudanças em nossas práticas ou requisitos
                           legais. Recomendamos que você revise esta política
                           regularmente.
                        </p>
                     </section>

                     <section>
                        <h2 className="text-2xl font-semibold mb-4">
                           6. Contato
                        </h2>
                        <p>
                           Se você tiver dúvidas sobre nossa política de
                           cookies, entre em contato conosco através da página
                           de contato.
                        </p>
                     </section>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </BaseLayout>
   );
}
