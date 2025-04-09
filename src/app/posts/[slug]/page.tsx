import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import TableOfContents from '@/components/TableOfContents';
import PostNavigation from '@/components/PostNavigation';
import ShareButtons from '@/components/ShareButtons';
import ViewCounter from '@/components/ViewCounter';
import ViewIncrement from '@/components/ViewIncrement';

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
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg p-8 mb-8 bg-white dark:bg-gray-800 shadow-sm">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-500">
            <time className="border rounded px-2 py-1">{post.date}</time>
            {post.category && (
              <Link 
                href={`/categories/${post.category}`}
                className="border rounded px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {post.category}
              </Link>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="border rounded px-2 py-1">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="border rounded-lg px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </article>
  );
} 