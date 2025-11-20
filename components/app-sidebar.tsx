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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-sm">
            HC
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-tight">Hiration</span>
            <span className="text-xs text-muted-foreground leading-tight">
              Counsellor Admin
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className="h-10 px-3 rounded-lg transition-all duration-200 hover:bg-accent data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium"
                    >
                      <Link href={item.href}>
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Hiration
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
