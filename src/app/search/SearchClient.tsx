'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Post } from '@/lib/posts';

export function SearchClient({ initialPosts }: { initialPosts: Post[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const results = initialPosts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
    post.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        &quot;{query}&quot;에 대한 검색 결과 ({results.length}개)
      </h1>
      
      {results.length > 0 ? (
        <ul className="space-y-6">
          {results.map(post => (
            <li key={post.slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link
                href={`/posts/${post.slug}`}
                className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <time className="border rounded px-2 py-1">{post.date}</time>
                  {post.category && (
                    <span className="border rounded px-2 py-1">{post.category}</span>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="border rounded px-2 py-1">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 py-8 border rounded-lg">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
} 