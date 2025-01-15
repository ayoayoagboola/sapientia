"use client";

import {
  Award,
  BookOpen,
  Brain,
  LayoutDashboard,
  Puzzle,
  ScrollText,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuLink,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Practice",
    url: "/practice",
    icon: Puzzle,
    active: true,
  },
  {
    title: "Dictionary",
    url: "/dictionary",
    icon: BookOpen,
    active: false,
  },
  {
    title: "Library",
    url: "/library",
    icon: ScrollText,
    active: false,
  },
  {
    title: "Learn",
    url: "/learn",
    icon: Brain,
    active: false,
  },
  {
    title: "Stats",
    url: "/stats",
    icon: Award,
    active: false,
  },
];

const MainSidebar = () => {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="justify-between">
        <SidebarGroup className="gap-y-3">
          <SidebarMenuButton
            className="group-data-[collapsible=icon]:!p-0 !p-0 h-13 hover:bg-transparent transition-transform"
            asChild
            isActive={false}
          >
            <Link href={"/"}>
              <div className={`w-full transition-transform ${open ? "pr-20" : ""}`}>
                <Image
                  className="w-full h-full transition-transform"
                  src={open ? "/assets/logo.png" : "/assets/icon.png"}
                  width={open ? 256 : 32}
                  height={open ? 50 : 32}
                  priority
                  alt="Logo"
                />
              </div>
            </Link>
          </SidebarMenuButton>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuLink href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                    {item.active == false && (
                      <SidebarMenuBadge className="bg-slate-200/80 text-slate-500">
                        Coming soon...
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainSidebar;
