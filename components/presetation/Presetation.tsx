"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Presentation() {
   return (
      <section className="relative overflow-hidden bg-background py-24">
         {/* Gradient Background */}
         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />

         {/* Content */}
         <div className="container relative mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl"
               >
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                     Explore o Mundo do{" "}
                     <span className="text-primary">Desenvolvimento</span>
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-muted-foreground">
                     Descubra artigos, tutoriais e insights sobre
                     desenvolvimento de software, tecnologia e as últimas
                     tendências do mundo da programação.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                     <Button asChild size="lg">
                        <Link
                           href="/posts"
                           className="inline-flex items-center"
                        >
                           Explorar Posts
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                     <Button variant="outline" size="lg" asChild>
                        <Link href="/about">Saiba Mais</Link>
                     </Button>
                  </div>
               </motion.div>

               {/* Decorative Elements */}
               <div className="relative">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, delay: 0.2 }}
                     className="absolute -left-4 top-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, delay: 0.4 }}
                     className="absolute -right-4 bottom-4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
                  />
               </div>
            </div>

            {/* Features */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.6 }}
               className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
               <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold">Artigos Detalhados</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                     Conteúdo aprofundado sobre as mais recentes tecnologias e
                     práticas de desenvolvimento.
                  </p>
               </div>
               <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold">Tutoriais Práticos</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                     Aprenda na prática com tutoriais passo a passo e exemplos
                     de código real.
                  </p>
               </div>
               <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold">Comunidade Ativa</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                     Participe de discussões e compartilhe conhecimento com
                     outros desenvolvedores.
                  </p>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
