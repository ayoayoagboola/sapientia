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
import { trpc } from "@/app/_trpc/client";

// TODO: fix + add styles

const LibrarySidebar = () => {
  const { open } = useSidebar();
  const sections = trpc.texts.getTextForms.useQuery({
    bucket: "classical_texts",
    prefix: "quinct-section",
  });

  return (
    <Sidebar side="right">
      <SidebarContent className="flex flex-col justify-start gap-y-3">
        <SidebarGroup className="flex w-full h-14 items-center justify-center">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>author</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>notes</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>toc</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="gap-y-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {sections?.data?.map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuLink href={`#section-${index + 1}`}>
                    Section {index + 1}
                  </SidebarMenuLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LibrarySidebar;
