import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
};

let postsCache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (postsCache) {
    return postsCache;
  }

  // 서버 사이드에서만 실행
  if (typeof window === 'undefined') {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        return getPostBySlug(slug);
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => (a.date > b.date ? -1 : 1));

    postsCache = posts;
    return posts;
  }

  return [];
}

export function getPostBySlug(slug: string): Post | null {
  // 서버 사이드에서만 실행
  if (typeof window === 'undefined') {
    try {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        content,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags,
      };
    } catch (error) {
      console.error(`Error reading post ${slug}:`, error);
      return null;
    }
  }

  return null;
}

export function getAdjacentPosts(currentSlug: string) {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);

  return {
    prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
} 