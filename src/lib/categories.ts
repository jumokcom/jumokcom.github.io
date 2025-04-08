import { getAllPosts } from './posts';

export interface CategoryCount {
  name: string;
  count: number;
}

export function getAllCategories(): CategoryCount[] {
  const posts = getAllPosts();
  const categories = new Map<string, number>();

  posts.forEach(post => {
    if (post.category) {
      const count = categories.get(post.category) || 0;
      categories.set(post.category, count + 1);
    }
  });

  return Array.from(categories.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPostsByCategory(category: string) {
  const posts = getAllPosts();
  return posts.filter(post => post.category === category);
} 