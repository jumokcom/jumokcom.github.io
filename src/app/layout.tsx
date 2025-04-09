import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Purange_Blog",
    template: "%s | Purange_Blog"
  },
  description: "Next.js와 TypeScript로 만든 개발 블로그입니다.",
  keywords: ["Next.js", "React", "JavaScript", "TypeScript", "개발", "프로그래밍"],
  authors: [{ name: "Purange" }],
  creator: "Purange",
  publisher: "Purange",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://jumokcom.github.io",
    siteName: "Purange_Blog",
    title: "Purange_Blog",
    description: "Next.js와 TypeScript로 만든 개발 블로그입니다.",
    images: [
      {
        url: "https://jumokcom.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Purange_Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Purange_Blog",
    description: "Next.js와 TypeScript로 만든 개발 블로그입니다.",
    images: ["https://jumokcom.github.io/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="border-t border-gray-200 dark:border-gray-800">
              <div className="container mx-auto px-4 py-6">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  © 2024 Purange_Blog. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 