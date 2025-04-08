export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  author?: {
    name: string;
    picture?: string;
  };
} 