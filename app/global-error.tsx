'use client';

import { Button } from './_components/ui/button';

export default function GlobalError({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   return (
      <html>
         <body>
            <div className="flex min-h-screen flex-col items-center justify-center">
               <div className="container mx-auto px-4 text-center">
                  <h1 className="mb-4 text-4xl font-bold">Algo deu errado!</h1>
                  <p className="mb-8 text-muted-foreground">
                     Desculpe, ocorreu um erro inesperado.
                  </p>
                  <Button onClick={() => reset()}>Tentar novamente</Button>
               </div>
            </div>
         </body>
      </html>
   );
}
