import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sapientia",
  description:
    "a comprehensive, free online resource for Latin learners and enthusiasts!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
