import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: '포스트를 찾을 수 없습니다' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="prose dark:prose-invert lg:prose-xl mx-auto">
      <header className="mb-8">
        <h1 className="mb-2">{post.title}</h1>
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
      </header>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-4 border-t dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
} 