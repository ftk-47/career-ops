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
  UserRound,
  BookOpen,
  User,
  Settings,
  LogOut,
  ChevronDown,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { PopupModal } from "react-calendly";
import { useMode, type Mode } from "@/contexts/mode-context";

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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  modes: readonly Mode[];
  count?: number;
  beta?: boolean;
};

type NavCategory = {
  label: string;
  items: NavItem[];
};

const navCategories: NavCategory[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Home",
        href: "/",
        icon: LayoutDashboard,
        modes: ["director", "reviewer"] as const,
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        modes: ["director"] as const,
      },
    ],
  },
  {
    label: "Workbench",
    items: [
      {
        label: "Submissions",
        href: "/student-submissions",
        icon: FileText,
        count: 7,
        modes: ["director", "reviewer"] as const,
      },
      {
        label: "Student Portfolio",
        href: "/student-portfolio",
        icon: Database,
        modes: ["director", "reviewer"] as const,
      },
      {
        label: "Review Center",
        href: "/review-center",
        icon: ListChecks,
        modes: ["director"] as const,
      },
      {
        label: "Cohorts",
        href: "/manage-cohorts",
        icon: GraduationCap,
        modes: ["director"] as const,
      },
      {
        label: "Interviews",
        href: "/manage-interviews",
        icon: Calendar,
        modes: ["director"] as const,
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        label: "Team",
        href: "/manage-team",
        icon: Users,
        modes: ["director"] as const,
      },
      {
        label: "Coaching Library",
        href: "/coaching-library",
        icon: BookOpen,
        beta: true,
        modes: ["director", "reviewer"] as const,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { mode } = useMode();
  
  // Filter nav categories and items based on current mode
  const filteredCategories = navCategories.map(category => ({
    ...category,
    items: category.items.filter(item => (item.modes as readonly Mode[]).includes(mode))
  })).filter(category => category.items.length > 0);
  
  // Calendly modal state
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement] = useState<HTMLElement | null>(
    typeof window !== 'undefined' ? document.body : null
  );
  
  // My Account dropdown state
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  return (
    <>
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
              Control Center
            </span>
          </div>
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="px-3 gap-0.5 py-1 pl-1 group-data-[collapsible=icon]:px-2">
        {filteredCategories.map((category) => (
          <SidebarGroup key={category.label} className="group-data-[collapsible=icon]:items-center p-0 pb-2">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-0.5 px-2">
              {category.label}
            </SidebarGroupLabel>
            <SidebarGroupContent className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center">
              <SidebarMenu className="gap-0.5 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:items-center">
                {category.items.map((item) => {
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
                          className="h-10 px-2 transition-all duration-200 hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:gap-0"
                        >
                          <Link href={item.href} className="flex items-center w-full h-full group-data-[collapsible=icon]:justify-center">
                            <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"}`} />
                            <span className="text-sm  group-data-[collapsible=icon]:hidden">{item.label}</span>
                            {item.beta && (
                              <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 h-4 group-data-[collapsible=icon]:hidden">
                                Beta
                              </Badge>
                            )}
                            {item.count !== undefined && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge className="ml-auto text-[10px] px-1.5 py-0 h-4 bg-yellow-500/20 text-yellow-700 dark:text-yellow-600 hover:bg-yellow-500/30 group-data-[collapsible=icon]:hidden">
                                      {item.count}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Pending Reviews</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {/* {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 w-1 h-7 bg-primary  group-data-[collapsible=icon]:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              />
                            )} */}
                          </Link>
                        </SidebarMenuButton>
                      </motion.div>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0.5 border-border px-4 py-0.5 group-data-[collapsible=icon]:p-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="group-data-[collapsible=icon]:hidden"
        >
          <Card
            className="hover:shadow-lg transition-all duration-200 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent py-0"
          >
            <CardHeader className="p-4 space-y-1">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <UserRound className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-sm leading-tight">
                    Need Help?
                  </CardTitle>
                </div>
              </div>
                  <CardDescription className="text-xs leading-relaxed">
                  Get setup guidance and best practices support.
                  </CardDescription>
              <Button
                onClick={() => setIsCalendlyOpen(true)}
                className="w-full text-xs h-8"
                size="sm"
              >
                Book a Call
              </Button>
            </CardHeader>
          </Card>
        </motion.div>

        <Separator className="my-1 group-data-[collapsible=icon]:my-2" />

        <DropdownMenu open={isAccountDropdownOpen} onOpenChange={setIsAccountDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start h-10 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <User className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-sm  flex-1 text-left group-data-[collapsible=icon]:hidden">My Account</span>
                <motion.div
                  animate={{ rotate: isAccountDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="group-data-[collapsible=icon]:hidden"
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
      
      {/* Calendly Modal */}
      {rootElement && (
        <PopupModal
          url="https://calendly.com/explore-hiration-s-career-suite/hiration-demo-in"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={rootElement}
        />
      )}
    </>
  );
}
