import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import TableOfContents from '@/components/TableOfContents';
import PostNavigation from '@/components/PostNavigation';
import ShareButtons from '@/components/ShareButtons';
import ViewCounter from '@/components/ViewCounter';

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

  const { prevPost, nextPost } = getAdjacentPosts(params.slug);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${params.slug}`;

  return (
    <div className="max-w-6xl mx-auto flex">
      <article className="flex-1 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.category && (
                <Link
                  href={`/category/${post.category.toLowerCase()}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {post.category}
                </Link>
              )}
            </div>
            <div className="flex items-center gap-4 mb-8">
              <ShareButtons url={url} title={post.title} />
              <ViewCounter slug={post.slug} />
            </div>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <Markdown content={post.content} />
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-4 border-t dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/tag/${tag}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        <PostNavigation prevPost={prevPost} nextPost={nextPost} />
      </article>
      <TableOfContents />
    </div>
  );
} 