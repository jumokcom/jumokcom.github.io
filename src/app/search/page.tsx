'use client';

import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const posts = getAllPosts();
  
  const results = posts.filter(post => 
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
            <li key={post.slug} className="border-b pb-6">
              <Link
                href={`/posts/${post.slug}`}
                className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <time>{post.date}</time>
                  {post.category && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{post.category}</span>
                    </>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 py-8">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
} 