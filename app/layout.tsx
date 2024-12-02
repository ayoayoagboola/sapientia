import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./_trpc/Providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "@/components/MainSidebar";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const sans = Noto_Sans({ subsets: ["latin"] });


// TODO: organize this... 

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
          <SidebarProvider>
            <MainSidebar />
            <div className="flex flex-col w-full h-full">
              <Navbar />
              <div className="w-full h-full">{children}</div>
            </div>
            <Toaster />
          </SidebarProvider>
        </body>
      </Providers>
    </html>
  );
}
