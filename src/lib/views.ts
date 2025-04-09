import redis from './redis';

export async function getViewCount(slug: string): Promise<number> {
  try {
    const views = await redis.get(`views:${slug}`);
    return views ? parseInt(views, 10) : 0;
  } catch (error) {
    console.error('Error getting view count:', error);
    return 0;
  }
}

export async function incrementViewCount(slug: string): Promise<void> {
  try {
    await redis.incr(`views:${slug}`);
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
} 