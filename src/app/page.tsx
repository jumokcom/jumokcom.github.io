import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map(post => post.category).filter(Boolean)));

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">환영합니다!</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Next.js와 TypeScript로 만든 개발 블로그입니다. 이곳에서 개발 관련 이야기들을 공유하려고 합니다.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">최근 포스트</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map(post => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <article className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <div className="mb-4">
                  <time className="text-sm text-gray-500 border rounded px-2 py-1">{post.date}</time>
                </div>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {post.category && (
                    <span className="text-sm border rounded px-2 py-1">{post.category}</span>
                  )}
                  {post.tags && post.tags.map(tag => (
                    <span key={tag} className="text-sm border rounded px-2 py-1">#{tag}</span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map(category => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 