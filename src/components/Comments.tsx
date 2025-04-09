'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const { theme } = useTheme();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const scriptElement = document.createElement('script');
    const attributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': process.env.NEXT_PUBLIC_GISCUS_REPO!,
      'data-repo-id': process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID!,
      'data-category': 'Comments',
      'data-category-id': process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!,
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': theme === 'dark' ? 'dark' : 'light',
      'data-lang': 'ko',
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      scriptElement.setAttribute(key, value);
    });

    // 이전 스크립트 제거
    const prevElement = elementRef.current.querySelector('script');
    if (prevElement) {
      prevElement.remove();
    }

    elementRef.current.appendChild(scriptElement);

    return () => {
      if (elementRef.current) {
        const script = elementRef.current.querySelector('script');
        if (script) script.remove();
      }
    };
  }, [theme]);

  return <div ref={elementRef} className="mt-10" />;
} 