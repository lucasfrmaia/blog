"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import BaseLayout from "@/components/layout/BaseLayout";

export default function AboutPage() {
   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-16">
            {/* Hero Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="flex flex-col lg:flex-row items-center gap-12 mb-20"
            >
               <div className="lg:w-1/2">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                     Sobre o Blog
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                     Bem-vindo ao nosso espaço dedicado ao compartilhamento de
                     conhecimento e experiências no mundo do desenvolvimento
                     web. Aqui, transformamos conceitos complexos em conteúdo
                     acessível e prático.
                  </p>
                  <div className="flex gap-4">
                     <Button asChild>
                        <Link href="/blog">
                           Explorar Posts
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                     <Button variant="outline" asChild>
                        <Link href="/contact">
                           Contato
                           <Mail className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                  </div>
               </div>
               <div className="lg:w-1/2">
                  <Image
                     src="/about-hero.jpg"
                     alt="Sobre o Blog"
                     width={600}
                     height={400}
                     className="rounded-lg shadow-lg"
                  />
               </div>
            </motion.div>

            {/* Mission Section */}
            <motion.section
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
               <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Nossa Missão</h3>
                  <p className="text-muted-foreground">
                     Compartilhar conhecimento de qualidade e inspirar
                     desenvolvedores a alcançarem seu potencial máximo.
                  </p>
               </div>
               <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Nossa Visão</h3>
                  <p className="text-muted-foreground">
                     Ser referência em conteúdo técnico de qualidade para a
                     comunidade de desenvolvimento.
                  </p>
               </div>
               <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Nossos Valores</h3>
                  <p className="text-muted-foreground">
                     Qualidade, transparência e compromisso com o aprendizado
                     contínuo da comunidade.
                  </p>
               </div>
            </motion.section>

            {/* Content Focus */}
            <motion.section
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
               viewport={{ once: true }}
               className="mb-20"
            >
               <h2 className="text-3xl font-bold mb-8 text-center">
                  Nosso Conteúdo
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                     <div className="bg-primary/10 p-3 rounded-lg h-fit">
                        <code className="text-primary text-2xl">{"</"}</code>
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold mb-2">
                           Desenvolvimento Web
                        </h3>
                        <p className="text-muted-foreground">
                           Tutoriais práticos e dicas sobre as mais recentes
                           tecnologias web, frameworks e boas práticas.
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="bg-primary/10 p-3 rounded-lg h-fit">
                        <code className="text-primary text-2xl">{"{ }"}</code>
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold mb-2">
                           Arquitetura de Software
                        </h3>
                        <p className="text-muted-foreground">
                           Discussões aprofundadas sobre padrões de projeto,
                           arquitetura limpa e boas práticas de código.
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="bg-primary/10 p-3 rounded-lg h-fit">
                        <code className="text-primary text-2xl">{"⚡"}</code>
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold mb-2">
                           Performance
                        </h3>
                        <p className="text-muted-foreground">
                           Técnicas e estratégias para otimização de aplicações
                           web e melhoria de desempenho.
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="bg-primary/10 p-3 rounded-lg h-fit">
                        <code className="text-primary text-2xl">{"🔒"}</code>
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold mb-2">
                           Segurança
                        </h3>
                        <p className="text-muted-foreground">
                           Melhores práticas de segurança para proteger suas
                           aplicações e dados dos usuários.
                        </p>
                     </div>
                  </div>
               </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
               viewport={{ once: true }}
               className="text-center bg-accent/50 p-12 rounded-lg"
            >
               <h2 className="text-3xl font-bold mb-4">
                  Faça Parte da Nossa Comunidade
               </h2>
               <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Junte-se a nós nessa jornada de aprendizado contínuo. Explore
                  nossos artigos, compartilhe conhecimento e cresça junto com a
                  comunidade.
               </p>
               <Button size="lg" asChild>
                  <Link href="/blog">
                     Começar a Explorar
                     <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
               </Button>
            </motion.section>
         </div>
      </BaseLayout>
   );
}
