import { motion } from "framer-motion";
import { IPost } from "@/services/modules/post/entities/Post";
import PostCard from "./PostCard";

interface PostGridProps {
   posts: IPost[];
}

export default function PostGrid({ posts }: PostGridProps) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {posts.map((post, index) => (
            <motion.div
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{
                  duration: 0.5,
                  delay: index * 0.1,
               }}
            >
               <PostCard
                  id={post.id}
                  title={post.title}
                  excerpt={post.description}
                  coverImage={post.img || "/placeholder.jpg"}
                  readTime={`${Math.ceil(
                     post.description.length / 1000
                  )} min de leitura`}
                  category={"Geral"}
                  views={post.views}
                  commentsCount={0}
               />
            </motion.div>
         ))}
      </div>
   );
}
