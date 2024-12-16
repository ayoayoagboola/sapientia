import LibrarySidebar from "@/components/nav/LibrarySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

// TODO: organize this...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex flex-col p-4 gap-y-4 w-full h-full">{children}</div>
    </div>
  );
}
