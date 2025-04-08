import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8">블로그 포스트</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map(post => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/posts/${post.slug}`}>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {post.category && (
                    <>
                      <span className="mx-2">·</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {post.category}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          아직 작성된 포스트가 없습니다.
        </p>
      )}
    </div>
  );
} 