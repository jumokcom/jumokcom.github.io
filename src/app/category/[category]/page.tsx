import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/interfaces/category';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export default function CategoryPage({ params }: Props) {
  const decodedCategory = decodeURIComponent(params.category);
  const category = CATEGORIES.find(c => c.slug === decodedCategory);
  
  if (!category) {
    notFound();
  }

  const posts = getAllPosts().filter(post => post.category?.toLowerCase() === category.name.toLowerCase());

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          {category.name}
          <span className="ml-2 text-xl text-gray-500 dark:text-gray-400">
            ({posts.length})
          </span>
        </h1>
        {category.description && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        )}
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          아직 작성된 게시물이 없습니다.
        </p>
      )}
    </div>
  );
} 