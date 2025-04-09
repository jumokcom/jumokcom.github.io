import Link from 'next/link';
import { Post } from '@/interfaces/post';

interface PostNavigationProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  return (
    <nav className="flex justify-between items-center mt-8 pt-8 border-t dark:border-gray-700">
      {prevPost ? (
        <Link
          href={`/posts/${prevPost.slug}`}
          className="group flex flex-col max-w-[40%]"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            이전 글
          </span>
          <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/posts/${nextPost.slug}`}
          className="group flex flex-col items-end max-w-[40%]"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            다음 글
          </span>
          <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
} 