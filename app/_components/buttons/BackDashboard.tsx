import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export function BackDashboard() {
   return (
      <Button variant="ghost" size="icon" asChild>
         <Link href="/dashboard/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
         </Link>
      </Button>
   );
}
