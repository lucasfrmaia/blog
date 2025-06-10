import { motion } from 'framer-motion';

export default function PostHeader() {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="mb-12"
      >
         <h1 className="text-4xl text-center font-bold">Blog</h1>
         <p className="text-muted-foreground text-center mt-2">
            Explore nossos posts mais recentes
         </p>
      </motion.div>
   );
}
