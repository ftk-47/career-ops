"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

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
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Student Submissions",
    href: "/student-submissions",
    icon: FileText,
  },
  {
    label: "Review Center",
    href: "/review-center",
    icon: ListChecks,
  },
  {
    label: "Manage Team",
    href: "/manage-team",
    icon: Users,
  },
  {
    label: "Manage Cohorts",
    href: "/manage-cohorts",
    icon: GraduationCap,
  },
  {
    label: "Manage Interviews",
    href: "/manage-interviews",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card z-20">
      <SidebarHeader className="border-b border-border p-3 group-data-[collapsible=icon]:p-4">
        <motion.div 
          className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-sm shrink-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:text-base"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            H
          </motion.div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-base font-semibold leading-tight">Hiration</span>
            <span className="text-xs text-muted-foreground leading-tight">
              Counsellor Admin
            </span>
          </div>
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4 group-data-[collapsible=icon]:px-2">
        <SidebarGroup className="group-data-[collapsible=icon]:items-center">
          <SidebarGroupContent className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center">
            <SidebarMenu className="gap-1 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center relative">
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full overflow-hidden"
                          layoutId="activeIndicator"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <div className="w-full h-full bg-linear-to-b from-primary via-primary to-primary/70" />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 rounded-lg sidebar-active-gradient pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </>
                    )}
                    <motion.div
                      className="w-full relative z-10"
                      whileHover={{ x: 2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        tooltip={item.label}
                        className="h-10 px-3 rounded-lg transition-all duration-200 hover:bg-gradient-subtle-horizontal data-[active=true]:bg-transparent data-[active=true]:text-primary data-[active=true]:font-medium group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:gap-0"
                      >
                        <Link href={item.href} className="flex items-center w-full h-full group-data-[collapsible=icon]:justify-center">
                          <Icon className="h-5 w-5 shrink-0" />
                          <span className="text-sm group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4 group-data-[collapsible=icon]:hidden">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Hiration
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
