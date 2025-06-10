'use client';

import { cn } from '@/lib/utils';
import { ROUTES_PAGE } from '@/utils/constantes/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../_components/ui/button';
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from '../_components/ui/card';
import { toast } from '../_components/ui/use-toast';
import { Input } from '../_components/ui/input';
import { Label } from '../_components/ui/label';
import Link from 'next/link';
import { useState } from 'react';

const passwordSchema = z
   .object({
      currentPassword: z.string(),
      newPassword: z.string().min(8, 'A senha deve ter no minimo 8 caracteres'),
      confirmPassword: z
         .string()
         .min(8, 'A senha deve ter no minimo 8 caracteres'),
   })
   .superRefine(({ confirmPassword, newPassword }, ctx) => {
      if (confirmPassword != newPassword) {
         ctx.addIssue({
            code: 'custom',
            message: 'As senhas devem ser iguais',
            path: ['confirmPassword'],
         });
      }
   });

type TypePasswordForm = z.infer<typeof passwordSchema>;

export function ResetPasswordForm() {
   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset: formReset,
   } = useForm<TypePasswordForm>({ resolver: zodResolver(passwordSchema) });

   const onSubmit: SubmitHandler<TypePasswordForm> = async (data) => {
      try {
         setIsLoading(true);
         const response = await fetch(`/api/auth/reset-password`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               currentPassword: data.currentPassword,
               newPassword: data.newPassword,
            }),
         });

         const result = await response.json();

         if (!response.ok) {
            throw new Error(result.message || 'Erro Desconhecido');
         }

         toast({
            title: 'Sucesso',
            description: 'Sua senha foi alterada com sucesso',
         });

         formReset();
      } catch (error) {
         toast({
            title: 'Erro ao mudar a senha',
            description: `${(error as Error).message}`,
            variant: 'destructive',
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div className="space-y-2">
            <Label htmlFor="currentPassword">Senha Atual</Label>
            <div className="relative max-w-72">
               <Input
                  {...register('currentPassword')}
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha atual"
               />
               <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
               >
                  {showCurrentPassword ? (
                     <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                     <Eye className="h-4 w-4 text-gray-500" />
                  )}
               </button>
            </div>
            {errors.currentPassword && (
               <p className="text-sm text-red-500">
                  {errors.currentPassword.message}
               </p>
            )}
         </div>
         <div className="space-y-2">
            <Label htmlFor="newPassword">Nova Senha</Label>
            <div className="relative max-w-72">
               <Input
                  {...register('newPassword')}
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Digite sua nova senha"
                  className="max-w-72"
               />
               <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
               >
                  {showNewPassword ? (
                     <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                     <Eye className="h-4 w-4 text-gray-500" />
                  )}
               </button>
            </div>
            {errors.newPassword && (
               <p className="text-sm text-red-500">
                  {errors.newPassword.message}
               </p>
            )}
         </div>
         <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <div className="relative max-w-72">
               <Input
                  {...register('confirmPassword')}
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua nova senha"
                  className="max-w-72"
               />
               <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
               >
                  {showConfirmPassword ? (
                     <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                     <Eye className="h-4 w-4 text-gray-500" />
                  )}
               </button>
            </div>
            {errors.confirmPassword && (
               <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
               </p>
            )}
         </div>
         <Button type="submit" disabled={isLoading}>
            {isLoading ? (
               <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Alterando...
               </>
            ) : (
               'Alterar Senha'
            )}
         </Button>
      </form>
   );
}
