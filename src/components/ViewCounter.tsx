'use client';

import { useEffect, useState } from 'react';
import { getViewCount, incrementViewCount } from '@/lib/views';

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const initialViews = await getViewCount(slug);
        setViews(initialViews);
        await incrementViewCount(slug);
        setViews(prev => prev + 1);
      } catch (error) {
        console.error('Error fetching views:', error);
      }
    };

    fetchViews();
  }, [slug]);

  return (
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {views.toLocaleString()}회 조회
    </span>
  );
} 