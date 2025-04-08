import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "개발 블로그",
  description: "Next.js로 만든 개발 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">개발 블로그</h1>
            <nav className="mt-4">
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-blue-500">홈</a></li>
                <li><a href="/posts" className="hover:text-blue-500">글목록</a></li>
              </ul>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
} 