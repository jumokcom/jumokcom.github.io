export default function Home() {
  return (
    <div className="space-y-8">
      <section className="prose dark:prose-invert lg:prose-xl">
        <h1 className="text-4xl font-bold mb-4">환영합니다!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Next.js와 TypeScript로 만든 개발 블로그입니다.
          이곳에서 개발 관련 이야기들을 공유하려고 합니다.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">최근 포스트</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">
              <a href="/posts/first-post" className="hover:text-blue-600 dark:hover:text-blue-400">
                Next.js로 블로그 만들기
              </a>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Next.js와 TypeScript를 사용하여 개발 블로그를 만드는 과정을 공유합니다.
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>2024년 3월 26일</span>
              <span className="mx-2">·</span>
              <span>개발</span>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/category/development" 
             className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 
                      hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
            개발 (1)
          </a>
          <a href="/category/web" 
             className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 
                      hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
            웹 (1)
          </a>
        </div>
      </section>
    </div>
  );
} 