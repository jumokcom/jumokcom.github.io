'use client';

import { useEffect } from 'react';

export default function ViewIncrement({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: 'POST' });
  }, [slug]);

  return null;
} 