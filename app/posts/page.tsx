'use client';

import { motion } from 'framer-motion';
import QueryError from '../_components/errors/QueryError';
import BaseLayout from '../_components/layout/BaseLayout';
import { LoadingPosts } from '../_components/loadings/posts/LoadingPosts';
import PostFilters from '../_components/post/PostFilters';
import PostGrid from '../_components/post/PostGrid';
import PostHeader from '../_components/post/PostHeader';
import PostPagination from '../_components/post/PostPagination';
import { ITENS_PER_PAGE } from '@/utils/constantes/constants';
import { usePosts } from '../_hooks/usePosts';

export default function PostsPage({
   searchParams,
}: {
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const page = Number(searchParams?.page) || 1;
   const search = (searchParams?.search as string) || '';
   const categories =
      (searchParams?.categories as string)?.split(',').filter(Boolean) || [];
   const sortBy = (searchParams?.sortBy as string) || 'recent';

   const {
      postsData,
      isLoading,
      error,
      refetch,
      handleApplyFilters,
      handleResetFilters,
      getPageUrl,
   } = usePosts({
      page,
      search,
      categories,
      sortBy,
      limit: ITENS_PER_PAGE,
      searchParams,
   });

   if (isLoading) {
      return <LoadingPosts />;
   }

   if (error) {
      return <QueryError onRetry={() => refetch()} />;
   }

   const totalPages = Math.ceil((postsData?.total || 0) / ITENS_PER_PAGE);

   return (
      <BaseLayout>
         <div className="container mx-auto px-4 py-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <PostHeader />

               <PostFilters
                  initialSearch={search}
                  initialCategories={categories}
                  initialSortBy={sortBy}
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
               />

               <div className="mt-10">
                  {postsData?.posts?.length ? (
                     <>
                        <PostGrid posts={postsData.posts} />
                        <PostPagination
                           currentPage={page}
                           totalPages={totalPages}
                           getPageUrl={getPageUrl}
                        />
                     </>
                  ) : (
                     <p className="text-center text-muted-foreground">
                        Nenhum post encontrado
                     </p>
                  )}
               </div>
            </motion.div>
         </div>
      </BaseLayout>
   );
}
