import { getAllPosts } from '@/lib/posts';
import { SearchClient } from './SearchClient';

// 서버에서 데이터 가져오기
async function getPosts() {
  return getAllPosts();
}

export default async function SearchPage() {
  const posts = await getPosts();
  return <SearchClient initialPosts={posts} />;
} 