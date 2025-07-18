"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
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
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
];

const secondSection = [{ icon: StarIcon, label: "Upgrade", href: "/upgrade" }];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Sidebar>
        {/* Logo Header */}
        <SidebarHeader>
          <div className="flex items-center justify-between px-2 pt-2">
            <Link
              href="/"
              className="flex items-center gap-2 scale-110 hover:scale-115 transition-transform duration-300 ease-in-out"
            >
              <Image src="/logo.svg" width={1340} height={1340} alt="Logo" />
            </Link>
          </div>
        </SidebarHeader>

        <div className="px-4 py-2">
          <Separator className="opacity-100 bg-sidebar-border" />
        </div>

        <SidebarContent>
          {/* First Menu Section */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {firstSection.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 px-3 rounded-md flex items-center gap-2 transition-colors duration-200",
                        "hover:bg-gradient-to-r hover:from-blue-600/60 hover:to-purple-600/60",
                        "border border-transparent hover:border-blue-600/60 hover:scale-105 transition-transform duration-300 ease-in-out ",
                        pathname === item.href &&
                          "bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-600/40"
                      )}
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-5 text-background dark:text-foreground" />
                        <span className="text-sm font-medium tracking-tight text-background dark:text-foreground  ">
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

          {/* Second Menu Section */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondSection.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 px-3 rounded-md flex items-center gap-2 transition-colors duration-200",
                        "hover:bg-gradient-to-r hover:from-blue-600/60 hover:to-purple-600/60",
                        "border border-transparent hover:border-blue-600/60 hover:scale-105 transition-transform duration-300 ease-in-out ",
                        pathname === item.href &&
                          "bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-600/40"
                      )}
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-5 text-background dark:text-foreground" />
                        <span className="text-sm font-medium tracking-tight text-background dark:text-foreground ">
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

        {/* Sidebar Footer */}
        <SidebarFooter>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="space-y-2"
          >
            <DashboardTrial />
            <DashboardUserButton />
          </motion.div>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  );
};
