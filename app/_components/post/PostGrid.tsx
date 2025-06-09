import { motion } from "framer-motion";
import PostCard from "./PostCard";
import { IPost } from "@/app/api/_services/entities/Post";

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
                  categories={post.categories}
                  views={post.views}
                  commentsCount={post?.comments?.length || 0}
                  publishedAt={post.createdAt}
               />
            </motion.div>
         ))}
      </div>
   );
}
