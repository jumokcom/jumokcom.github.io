import { getAllPosts } from '@/lib/posts';
import { SearchClient } from './SearchClient';
import { Suspense } from 'react';

// 서버에서 데이터 가져오기
async function getPosts() {
  return getAllPosts();
}

export default async function SearchPage() {
  const posts = await getPosts();
  return (
    <Suspense fallback={<div>검색 중...</div>}>
      <SearchClient initialPosts={posts} />
    </Suspense>
  );
} 