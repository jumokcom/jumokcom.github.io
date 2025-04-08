import { getPostsByCategory, getAllCategories } from '@/lib/categories';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.name,
  }));
}

export default function CategoryPage({ params }: Props) {
  const decodedCategory = decodeURIComponent(params.category);
  const posts = getPostsByCategory(decodedCategory);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          카테고리: {decodedCategory}
          <span className="ml-2 text-xl text-gray-500 dark:text-gray-400">
            ({posts.length})
          </span>
        </h1>
      </header>

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
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
} 