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
  },
  {
    title: "Practice",
    url: "/practice",
    icon: Puzzle,
  },
  {
    title: "Dictionary",
    url: "/dictionary",
    icon: BookOpen,
  },
  {
    title: "Library",
    url: "/library",
    icon: ScrollText,
  },
  {
    title: "Learn",
    url: "/learn",
    icon: Brain,
  },
  {
    title: "Stats",
    url: "/stats",
    icon: Award,
  },
];

const MainSidebar = () => {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="justify-between">
        <SidebarGroup className="gap-y-3">
          <SidebarMenuButton
            className="group-data-[collapsible=icon]:!p-0 !p-0 h-13 hover:bg-transparent"
            asChild
            isActive={false}
          >
            <a href={"/"}>
              <div className={`w-full ${open ? "pr-20" : ""}`}>
                <Image
                  className="w-full h-full"
                  src={open ? "/assets/logo.png" : "/assets/icon.png"}
                  width={open ? 256 : 32}
                  height={open ? 50 : 32}
                  priority
                  alt="Logo"
                />
              </div>
            </a>
          </SidebarMenuButton>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuLink href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
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
                <a href="/settings">
                  <Settings />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainSidebar;
