import type { Metadata } from "next";
import { QueryProvider } from "@/providers/query-provider";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "게시판",
  description: "게시판 애플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <main className="container">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
