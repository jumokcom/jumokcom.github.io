export interface Category {
  name: string;
  description?: string;
  slug: string;
  count: number;
}

export const CATEGORIES = [
  {
    name: 'Algorithm',
    description: '알고리즘 문제 풀이와 개념 정리',
    slug: 'algorithm',
  },
  {
    name: 'Web',
    description: '웹 개발 관련 기술과 경험',
    slug: 'web',
  },
  {
    name: 'TypeScript',
    description: 'TypeScript 관련 팁과 노하우',
    slug: 'typescript',
  },
  {
    name: 'Git',
    description: 'Git 사용법과 팁',
    slug: 'git',
  },
  {
    name: 'GitHub Blog',
    description: '블로그 개발 과정과 팁',
    slug: 'blog',
  },
  {
    name: 'Machine Learning',
    description: '머신러닝 학습과 프로젝트',
    slug: 'ml',
  },
] as const; 