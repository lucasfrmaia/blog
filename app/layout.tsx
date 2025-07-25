import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ContextProvider } from '@/context/ContextProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Blog',
   description: 'Um blog moderno e completo',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="pt-BR">
         <body className={inter.className}>
            <ContextProvider>{children}</ContextProvider>
         </body>
      </html>
   );
}
