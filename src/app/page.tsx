export default function Home() {
  return (
    <div className="prose lg:prose-xl">
      <h1>환영합니다!</h1>
      <p>
        Next.js와 TypeScript로 만든 개발 블로그입니다.
        이곳에서 개발 관련 이야기들을 공유하려고 합니다.
      </p>
      <h2>최근 포스트</h2>
      <ul>
        <li>
          <a href="/posts/first-post">첫 번째 글: Next.js로 블로그 만들기</a>
        </li>
      </ul>
    </div>
  );
} 