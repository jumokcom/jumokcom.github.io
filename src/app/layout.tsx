import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "개발 블로그",
  description: "Next.js와 TypeScript로 만든 개발 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark:bg-gray-900">
      <body className={`${inter.className} dark:text-gray-100`}>
        <ThemeProvider />
        <div className="min-h-screen">
          <header className="border-b dark:border-gray-700">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <nav className="flex items-center justify-between">
                <a href="/" className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400">
                  개발 블로그
                </a>
                <div className="flex items-center space-x-6">
                  <ul className="flex space-x-6">
                    <li>
                      <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">홈</a>
                    </li>
                    <li>
                      <a href="/posts" className="hover:text-blue-600 dark:hover:text-blue-400">글목록</a>
                    </li>
                    <li>
                      <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">소개</a>
                    </li>
                  </ul>
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="border-t dark:border-gray-700 mt-auto">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <p className="text-center text-gray-600 dark:text-gray-400">
                © 2024 개발 블로그. Built with Next.js and TypeScript.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 