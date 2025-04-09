import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { CATEGORIES } from '@/interfaces/category';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <section className="prose dark:prose-invert lg:prose-xl">
        <h1 className="text-4xl font-bold mb-4">환영합니다!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Next.js와 TypeScript로 만든 개발 블로그입니다.
          이곳에서 개발 관련 이야기들을 공유하려고 합니다.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">최근 포스트</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.slice(0, 4).map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="flex flex-wrap gap-4">
          {CATEGORIES.map(category => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 
                       hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 