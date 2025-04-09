import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const views = await kv.incr(`views:${slug}`);

  return NextResponse.json({ views });
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const views = await kv.get<number>(`views:${slug}`) || 0;

  return NextResponse.json({ views });
} 