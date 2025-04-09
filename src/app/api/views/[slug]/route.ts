import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    await redis.incr(`views:${slug}`);
    const views = await redis.get(`views:${slug}`);
    
    return NextResponse.json({ views: parseInt(views || '0', 10) });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const views = await redis.get(`views:${slug}`);
    return NextResponse.json({ views: parseInt(views || '0', 10) });
  } catch (error) {
    console.error('Error getting view count:', error);
    return NextResponse.json({ error: 'Failed to get view count' }, { status: 500 });
  }
} 