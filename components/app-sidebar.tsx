"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Database,
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
    label: "Student Portfolio",
    href: "/student-portfolio",
    icon: Database,
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
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-md shrink-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:text-base"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            H
          </motion.div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-base font-bold leading-tight tracking-tight">Hiration</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Admin Dashboard
            </span>
          </div>
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4 group-data-[collapsible=icon]:px-2">
        <SidebarGroup className="group-data-[collapsible=icon]:items-center">
          <SidebarGroupContent className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center">
            <SidebarMenu className="gap-1.5 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center relative">
                    <motion.div
                      className="w-full relative z-10"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className="h-10 px-3 rounded-xl transition-all duration-200 hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:gap-0"
                      >
                        <Link href={item.href} className="flex items-center w-full h-full group-data-[collapsible=icon]:justify-center">
                          <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"}`} />
                          <span className="text-sm ml-3 group-data-[collapsible=icon]:hidden">{item.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 w-1 h-6 bg-primary rounded-r-full group-data-[collapsible=icon]:hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
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
