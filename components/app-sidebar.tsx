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
  ChevronLeft,
  Check,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Submissions",
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
    label: "Team",
    href: "/manage-team",
    icon: Users,
  },
  {
    label: "Cohorts",
    href: "/manage-cohorts",
    icon: GraduationCap,
  },
  {
    label: "Interviews",
    href: "/manage-interviews",
    icon: Calendar,
  },
  {
    label: "Coaching Library",
    href: "/coaching-library",
    icon: BookOpen,
    beta: true,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  
  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

  // Time slots from 9 AM to 5 PM in 1-hour intervals
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // Reset modal state when closed
  const handleCloseModal = () => {
    setIsBookingOpen(false);
    setTimeout(() => {
      setBookingStep(1);
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }, 200);
  };

  // Get dialog title based on current step
  const getDialogTitle = () => {
    switch (bookingStep) {
      case 1:
        return "Select a Date";
      case 2:
        return "Select a Time";
      case 3:
        return "Confirm Your Booking";
      case 4:
        return "Thank you for booking!";
      default:
        return "Book Consultation";
    }
  };

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
                        className="h-10 px-3 transition-all duration-200 hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:gap-0"
                      >
                        <Link href={item.href} className="flex items-center w-full h-full group-data-[collapsible=icon]:justify-center">
                          <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"}`} />
                          <span className="text-sm ml-3 group-data-[collapsible=icon]:hidden">{item.label}</span>
                          {item.beta && (
                            <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 h-4 group-data-[collapsible=icon]:hidden">
                              Beta
                            </Badge>
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
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4 group-data-[collapsible=icon]:hidden">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Card
            className="hover:shadow-lg transition-all duration-200 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent py-0"
          >
            <CardHeader className="p-4 space-y-1">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <UserRound className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-sm leading-tight">
                    Book 1:1 Expert Consultation
                  </CardTitle>
                </div>
              </div>
                  <CardDescription className="text-xs leading-relaxed">
                    Get expert guidance for student success
                  </CardDescription>
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="w-full text-xs h-8"
                size="sm"
              >
                Schedule Now
              </Button>
            </CardHeader>
          </Card>
        </motion.div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          © {new Date().getFullYear()} Hiration
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
      
      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-md">
              <DialogTitle className={bookingStep === 4 ? "text-center text-xl" : ""}>
                {getDialogTitle()}
              </DialogTitle>
              {bookingStep === 1 && (
                <p className="text-sm text-muted-foreground mt-2 mb-2">
                  Select a date to book your consultation
                </p>
              )}
              {bookingStep === 2 && selectedDate && (
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}

          {/* Step 1: Calendar Selection */}
          {bookingStep === 1 && (
            <div className="flex flex-col items-center gap-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  if (date) {
                    setBookingStep(2);
                  }
                }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border"
              />
            </div>
          )}

          {/* Step 2: Time Slot Selection */}
          {bookingStep === 2 && selectedDate && (
            <>
              <div className="grid grid-cols-3 gap-2 py-4">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => {
                      setSelectedTime(time);
                      setBookingStep(3);
                    }}
                    className="w-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() => setBookingStep(1)}
                className="w-full"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Calendar
              </Button>
            </>
          )}

          {/* Step 3: Booking Confirmation */}
          {bookingStep === 3 && selectedDate && selectedTime && (
            <div className="flex flex-col gap-4 py-4">
              <div className="rounded-lg border p-4 space-y-3 bg-muted/30">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedTime}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setBookingStep(2)}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setBookingStep(4)}
                  className="flex-1"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Thank You Message */}
          {bookingStep === 4 && selectedDate && selectedTime && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Your consultation has been successfully scheduled.
              </p>
              <div className="rounded-lg border p-4 space-y-3 bg-muted/30 w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedTime}</span>
                </div>
              </div>
              <Button
                onClick={handleCloseModal}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
