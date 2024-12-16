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
          <main>
            <SidebarProvider>
              <MainSidebar />
              <div className="flex flex-col w-full">
                <Navbar />
                <div className="w-full">{children}</div>
              </div>
              {/* <LibrarySidebar /> */}
            </SidebarProvider>
          </main>
          <Toaster />
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
