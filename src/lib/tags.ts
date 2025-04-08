import { Post } from '@/interfaces/post';
import { getAllPosts } from './posts';

export interface Tag {
  name: string;
  count: number;
}

export function getAllTags(posts: Post[]): Tag[] {
  const tags = posts.reduce((acc: { [key: string]: number }, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag]++;
        } else {
          acc[tag] = 1;
        }
      });
    }
    return acc;
  }, {});

  return Object.entries(tags)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(post => post.tags?.includes(tag));
}

export function getPopularTags(limit = 10): Tag[] {
  return getAllTags(getAllPosts()).slice(0, limit);
} 