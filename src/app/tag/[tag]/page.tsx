import { getAllPosts } from '@/lib/posts';
import { getAllTags } from '@/lib/tags';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = getAllTags(posts);
  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

export default function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = getAllPosts().filter(post => post.tags?.includes(decodedTag));

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          #{decodedTag}
          <span className="ml-2 text-xl text-gray-500 dark:text-gray-400">
            ({posts.length})
          </span>
        </h1>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
} 