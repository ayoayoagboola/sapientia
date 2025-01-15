import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./_trpc/Providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "@/components/nav/MainSidebar";
import { cn } from "@/lib/utils";
import Navbar from "@/components/nav/Navbar";
import LibrarySidebar from "@/components/nav/LibrarySidebar";
import Footer from "@/components/nav/Footer";

const sans = Noto_Sans({ subsets: ["latin"] });

// TODO: figure out library sidebar

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
      <link rel="icon" href="/assets/favicon.ico" sizes="any" />
      <Providers>
        <body className={cn(sans.className, "bg-slate-50")}>
          <main className="flex min-h-screen flex-col">
            <SidebarProvider>
              <div className="flex flex-1">
                <MainSidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <div className="flex-1 min-h-screen">{children}</div>
                  <Footer />
                </div>
              </div>
            </SidebarProvider>
          </main>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
