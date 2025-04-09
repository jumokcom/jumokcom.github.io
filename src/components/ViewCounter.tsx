import redis from '@/lib/redis';

async function getViews(slug: string): Promise<number> {
  try {
    const views = await redis.get(`views:${slug}`);
    return views ? parseInt(views, 10) : 0;
  } catch (error) {
    console.error('Error getting view count:', error);
    return 0;
  }
}

export default async function ViewCounter({ slug }: { slug: string }) {
  const views = await getViews(slug);

  return (
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {views.toLocaleString()}회 조회
    </span>
  );
} 