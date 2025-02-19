"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   Mail,
   MessageSquare,
   Phone,
   MapPin,
   Send,
   Github,
   Linkedin,
   Twitter,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
   return (
      <div className="container mx-auto px-4 py-16">
         <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="text-center mb-12"
            >
               <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
                  Preencha o formulário abaixo ou use um de nossos canais de
                  contato.
               </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Contact Form */}
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
               >
                  <Card>
                     <CardHeader>
                        <CardTitle>Envie uma Mensagem</CardTitle>
                        <CardDescription>
                           Preencha o formulário abaixo e entraremos em contato
                           o mais breve possível.
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <form className="space-y-4">
                           <div>
                              <label
                                 htmlFor="name"
                                 className="text-sm font-medium mb-2 block"
                              >
                                 Nome
                              </label>
                              <Input
                                 id="name"
                                 placeholder="Seu nome completo"
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="email"
                                 className="text-sm font-medium mb-2 block"
                              >
                                 E-mail
                              </label>
                              <Input
                                 id="email"
                                 type="email"
                                 placeholder="seu@email.com"
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="subject"
                                 className="text-sm font-medium mb-2 block"
                              >
                                 Assunto
                              </label>
                              <Input
                                 id="subject"
                                 placeholder="Assunto da mensagem"
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="message"
                                 className="text-sm font-medium mb-2 block"
                              >
                                 Mensagem
                              </label>
                              <Textarea
                                 id="message"
                                 placeholder="Digite sua mensagem aqui..."
                                 rows={5}
                                 required
                              />
                           </div>
                           <Button className="w-full">
                              Enviar Mensagem
                              <Send className="ml-2 h-4 w-4" />
                           </Button>
                        </form>
                     </CardContent>
                  </Card>
               </motion.div>

               {/* Contact Information */}
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-6"
               >
                  {/* Direct Contact */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Informações de Contato</CardTitle>
                        <CardDescription>
                           Escolha a melhor forma de entrar em contato conosco
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="bg-primary/10 p-3 rounded-lg">
                              <Mail className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                              <p className="font-medium">E-mail</p>
                              <p className="text-sm text-muted-foreground">
                                 contato@blog.com
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="bg-primary/10 p-3 rounded-lg">
                              <Phone className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                              <p className="font-medium">Telefone</p>
                              <p className="text-sm text-muted-foreground">
                                 +55 (11) 99999-9999
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="bg-primary/10 p-3 rounded-lg">
                              <MapPin className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                              <p className="font-medium">Endereço</p>
                              <p className="text-sm text-muted-foreground">
                                 São Paulo, SP - Brasil
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Social Media */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Redes Sociais</CardTitle>
                        <CardDescription>
                           Conecte-se conosco nas redes sociais
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="flex gap-4">
                           <Button variant="outline" size="icon" asChild>
                              <Link
                                 href="https://github.com"
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 <Github className="h-4 w-4" />
                                 <span className="sr-only">GitHub</span>
                              </Link>
                           </Button>
                           <Button variant="outline" size="icon" asChild>
                              <Link
                                 href="https://linkedin.com"
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 <Linkedin className="h-4 w-4" />
                                 <span className="sr-only">LinkedIn</span>
                              </Link>
                           </Button>
                           <Button variant="outline" size="icon" asChild>
                              <Link
                                 href="https://twitter.com"
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 <Twitter className="h-4 w-4" />
                                 <span className="sr-only">Twitter</span>
                              </Link>
                           </Button>
                        </div>
                     </CardContent>
                  </Card>

                  {/* FAQ */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Perguntas Frequentes</CardTitle>
                        <CardDescription>
                           Encontre respostas rápidas para suas dúvidas
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Link
                           href="/faq"
                           className="flex items-center text-primary hover:underline"
                        >
                           <MessageSquare className="mr-2 h-4 w-4" />
                           Acessar FAQ
                        </Link>
                     </CardContent>
                  </Card>
               </motion.div>
            </div>
         </div>
      </div>
   );
}
