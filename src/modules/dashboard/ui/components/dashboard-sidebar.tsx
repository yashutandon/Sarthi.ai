
"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";
import { DashboardTrial } from "./dashboard-trial";
const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <div className="flex items-center justify-between px-2 pt-2">
          <Link 
            href="/" 
            className="flex items-center gap-2 scale-110 hover:scale-115 transition-transform duration-300 ease-in-out"
          >
            <Image src="/logo.svg" width={1900} height={1900} alt="Logo" />
          </Link>
        </div>
      </SidebarHeader>
      
      <div className="px-4 py-2">
        <Separator className="opacity-100 bg-sidebar-border" />
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-l/oklch border border-transparent hover:border-[#005C4B]/10",
                      "from-sidebar-accent-foreground from-5% via-50% via-sidebar-accent-foreground/50 to-sidebar-accent-foreground/50",
                      "hover:scale-105 transition-transform duration-300 ease-in-out",
                      pathname === item.href && "bg-linear-to-r/oklch border-[#005C4B]/10"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="text-sidebar-foreground size-5" />
                      <span className="text-sm text-sidebar-foreground font-medium tracking-tight hover:text-primary">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="px-4 py-2">
          <Separator className="opacity-100 bg-sidebar-border" />
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-l/oklch border border-transparent hover:border-[#005C4B]/10",
                      "from-sidebar-accent-foreground from-5% via-50% via-sidebar-accent-foreground/50 to-sidebar-accent-foreground/50",
                      "hover:scale-105 transition-transform duration-300 ease-in-out",
                      pathname === item.href && "bg-linear-to-r/oklch border-[#005C4B]/10"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="text-sidebar-foreground size-5" />
                      <span className="text-sm text-sidebar-foreground hover:text-primary font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="text-sidebar-foreground">
        <DashboardTrial/>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};