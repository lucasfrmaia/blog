import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface QueryErrorProps {
   message?: string;
   onRetry?: () => void;
}

export default function QueryError({
   message = "Ocorreu um erro ao carregar os dados.",
   onRetry,
}: QueryErrorProps) {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex flex-col items-center justify-center p-8 text-center"
      >
         <div className="mb-4 rounded-full bg-destructive/10 p-3">
            <AlertCircle className="h-6 w-6 text-destructive" />
         </div>
         <h3 className="mb-2 text-xl font-semibold">Ops! Algo deu errado</h3>
         <p className="mb-4 text-muted-foreground">{message}</p>
         {onRetry && (
            <Button onClick={onRetry} variant="outline">
               Tentar novamente
            </Button>
         )}
      </motion.div>
   );
}
