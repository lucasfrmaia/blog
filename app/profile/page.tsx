"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import BaseLayout from "@/components/layout/BaseLayout";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { AuthUser } from "@/utils/types/auth";

export default function ProfilePage() {
   const { data: session, status } = useSession();
   const user = session?.user as AuthUser | undefined;

   if (status === "loading") {
      return null;
   }

   if (!session) {
      redirect("/login");
   }

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="max-w-4xl mx-auto"
            >
               <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
               <div className="grid gap-8">
                  <ProfileInfo user={user!} />
               </div>
            </motion.div>
         </div>
      </BaseLayout>
   );
}
