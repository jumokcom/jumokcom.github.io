import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map(post => post.category).filter(Boolean)));
  
  return categories.map((category) => ({
    category: category,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.category} 카테고리의 글 목록`,
    description: `${params.category} 카테고리에 속한 블로그 포스트 목록입니다.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const posts = await getAllPosts();
  const categoryPosts = posts.filter(post => post.category === params.category);

  if (categoryPosts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {params.category} 카테고리의 글 ({categoryPosts.length}개)
        </h1>

        <div className="space-y-6">
          {categoryPosts.map(post => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <article className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <div className="mb-4">
                  <time className="text-sm text-gray-500 border rounded px-2 py-1">{post.date}</time>
                </div>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {post.tags && post.tags.map(tag => (
                    <span key={tag} className="text-sm border rounded px-2 py-1">#{tag}</span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="border rounded-lg px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 