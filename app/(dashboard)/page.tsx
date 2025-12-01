"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import { AnimatedCard } from "@/components/motion/animated-card";
import { PageHeader } from "@/components/page-header";
import { ThemeSelector } from "@/components/theme-selector";
import { StyleSelector } from "@/components/style-selector";
import { ModeToggle } from "@/components/mode-toggle";
import { PrimaryKpisRow } from "@/components/dashboard/improved-kpi-cards";
import { CounselorTools } from "@/components/counselor-tools";
import { OnboardingModal } from "@/components/onboarding-modal";
import { PendingReviewsCard } from "@/components/pending-reviews-card";
import { useMode } from "@/contexts/mode-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  UserPlus,
  GraduationCap,
  ClipboardList,
  ArrowUpRight,
  Info,
  X,
  Calendar,
  UserRound,
  ChevronLeft,
  Check,
  BarChart3,
} from "lucide-react";

// Mock Data
const studentsNeedingAttention = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex.m@university.edu",
    issue: "Resume score below 40",
    badgeType: "Low Score",
    badgeVariant: "warning" as const,
    initials: "AM",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sarah.j@university.edu",
    issue: "No activity in 15 days",
    badgeType: "Inactive",
    badgeVariant: "secondary" as const,
    initials: "SJ",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.c@university.edu",
    issue: "Profile only 30% complete",
    badgeType: "Incomplete",
    badgeVariant: "error" as const,
    initials: "MC",
  },
  {
    id: 4,
    name: "Jessica Wu",
    email: "jessica.w@university.edu",
    issue: "No interview practice started",
    badgeType: "Low Score",
    badgeVariant: "warning" as const,
    initials: "JW",
  },
  {
    id: 5,
    name: "David Park",
    email: "david.p@university.edu",
    issue: "Resume stagnant at 55",
    badgeType: "Low Score",
    badgeVariant: "warning" as const,
    initials: "DP",
  },
];

const quickActions = [
  {
    title: "Review Submission",
    description: "You have 7 pending reviews",
    icon: ClipboardList,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeCount: 7,
  },
  {
    title: "Invite Member",
    description: "Add a new team member",
    icon: UserPlus,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Create Cohort",
    description: "Start a new student cohort",
    icon: GraduationCap,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Create Interview",
    description: "Set up interview template",
    icon: Calendar,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export default function Dashboard() {
  const { mode } = useMode();
  
  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  
  // Banner dismissal state with localStorage
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  
  // Onboarding modal state
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  
  // Check localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const dismissed = localStorage.getItem("demo-banner-dismissed") === "true";
    if (dismissed) {
      // Necessary for hydration: update state after mount to match localStorage
      // eslint-disable-next-line
      setIsBannerDismissed(true);
    }
    
    // Check if onboarding has been completed in this session
    const onboardingCompleted = sessionStorage.getItem("onboarding-completed") === "true";
    if (!onboardingCompleted) {
      // Show onboarding modal once per session
      setIsOnboardingModalOpen(true);
    }
  }, []);
  
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
  
  // Handle banner dismissal
  const handleDismissBanner = () => {
    setIsBannerDismissed(true);
    localStorage.setItem("demo-banner-dismissed", "true");
  };

  // Handle onboarding modal close
  const handleOnboardingModalChange = (open: boolean) => {
    setIsOnboardingModalOpen(open);
    if (!open) {
      // Mark as completed in session storage when closed
      sessionStorage.setItem("onboarding-completed", "true");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <PageHeader
        title={mode === "director" ? "Director Home" : "Reviewer Home"}
        description={mode === "director" ? "University-wide insights and team oversight" : "Review submissions and support students"}
        actions={
          <div className="flex items-center gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.open("https://www.hiration.com/app", "_blank", "noopener,noreferrer")}
            >
              <GraduationCap className="h-4 w-4" />
              View as Student
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <StyleSelector />
            <ThemeSelector />
          </div>
        }
      />

      {/* Demo Banner */}
      {!isBannerDismissed && (
        <div className="w-full px-4 md:px-6 xl:px-8 py-3">
          <div className="max-w-full rounded-lg border border-border bg-card shadow-sm">
            <div className="px-4 md:px-5 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 shrink-0">
                    <Info className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <span className="text-sm font-semibold text-foreground">You&apos;re Viewing a Demo</span>
                    <span className="text-xs text-muted-foreground">
                      <span className="hidden sm:inline mx-1.5">•</span>
                      Book a consultation to unlock full features
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button 
                    size="sm" 
                    onClick={() => setIsBookingOpen(true)}
                    className="whitespace-nowrap h-8 text-xs"
                  >
                    Book Consultation
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={handleDismissBanner}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 xl:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between max-w-full">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Welcome, Sarah</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {mode === "director" 
                ? "Get started by exploring your dashboard and connecting with students."
                : "Review pending submissions and provide feedback to students."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">You are viewing as</span>
            <ModeToggle />
          </div>
        </div>

        {/* Director Mode: Primary KPIs */}
        {mode === "director" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Primary KPIs
              </h2>
              <Link href="/analytics">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  View Detailed Analytics
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <FadeIn delay={0.1} direction="up">
              <PrimaryKpisRow />
            </FadeIn>
          </div>
        )}

        {/* Director Mode: Quick Actions and Students Needing Attention */}
        {mode === "director" && (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-4 max-w-full">
            {/* Quick Actions */}
            <div className="space-y-3 lg:col-span-1">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Quick Actions
              </h2>
              <FadeIn delay={0.2} direction="up">
                <Card className="rounded-xl py-0 shadow-sm border bg-card">
                  <CardContent className="p-4 space-y-2">
                    {quickActions.map((action, index) => {
                      const isPrimary = index === 0;
                      return (
                        <AnimatedCard key={action.title} delay={index * 0.05}>
                          <Button
                            variant={isPrimary ? "default" : "outline"}
                            className={`w-full justify-start h-auto py-3 px-4 ${
                              isPrimary
                                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                : "bg-background hover:bg-muted border"
                            } transition-all duration-200`}
                          >
                            <div className="flex items-center gap-3 w-full">
                              <div className={`flex items-center justify-center shrink-0 ${
                                isPrimary ? "text-primary-foreground" : "text-foreground"
                              }`}>
                                <action.icon className="h-5 w-5" />
                              </div>
                              <span className={`font-medium text-sm flex-1 text-left ${
                                isPrimary ? "text-primary-foreground" : "text-foreground"
                              }`}>
                                {action.title}
                              </span>
                              {action.badgeCount !== undefined && action.badgeCount > 0 && (
                                <span className="h-5 min-w-5 px-1.5 flex items-center justify-center text-xs font-bold rounded-full bg-white text-primary shadow-sm">
                                  {action.badgeCount}
                                </span>
                              )}
                            </div>
                          </Button>
                        </AnimatedCard>
                      );
                    })}
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            {/* Students Needing Attention */}
            <div className="space-y-3 lg:col-span-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Students Needing Attention
              </h2>
              <FadeIn delay={0.2} direction="up">
                <Card className="rounded-xl gap-2 p-0 px-0 shadow-sm hover:shadow-md transition-shadow duration-200">
                  
                  <CardContent className="p-0 px-0">
                    <div className="rounded-lg border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Issue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <StaggerContainer
                          as="tbody"
                          delay={0.05}
                          staggerDelay={0.03}
                        >
                          {studentsNeedingAttention.map((student) => (
                            <StaggerItem
                              key={student.id}
                              as="tr"
                              className="border-b transition-colors hover:bg-muted/50 group"
                            >
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10 ring-2 ring-border group-hover:ring-primary/30 transition-all duration-200">
                                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                                      {student.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">{student.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {student.email}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-start gap-2">
                                  <div className="mt-0.5 p-1 rounded-md bg-muted/50 shrink-0">
                                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {student.issue}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={student.badgeVariant} 
                                  className="text-xs font-medium"
                                >
                                  {student.badgeType}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                                >
                                  View Student
                                  <ArrowUpRight className="h-3.5 w-3.5 ml-1.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                                </Button>
                              </TableCell>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        )}

        {/* Reviewer Mode: Pending Reviews and Students Needing Attention */}
        {mode === "reviewer" && (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 max-w-full">
            {/* Pending Reviews */}
            <div className="space-y-3 lg:col-span-1">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Your Reviews
              </h2>
              <FadeIn delay={0.2} direction="up">
                <PendingReviewsCard />
              </FadeIn>
            </div>

            {/* Students Needing Attention */}
            <div className="space-y-3 lg:col-span-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Students Needing Attention
              </h2>
              <FadeIn delay={0.2} direction="up">
                <Card className="rounded-xl p-0 px-0 gap-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-0 px-0">
                    <div className="rounded-lg border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Issue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <StaggerContainer
                          as="tbody"
                          delay={0.05}
                          staggerDelay={0.03}
                        >
                          {studentsNeedingAttention.map((student) => (
                            <StaggerItem
                              key={student.id}
                              as="tr"
                              className="border-b transition-colors hover:bg-muted/50 group"
                            >
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10 ring-2 ring-border group-hover:ring-primary/30 transition-all duration-200">
                                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                                      {student.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">{student.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {student.email}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-start gap-2">
                                  <div className="mt-0.5 p-1 rounded-md bg-muted/50 shrink-0">
                                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {student.issue}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={student.badgeVariant} 
                                  className="text-xs font-medium"
                                >
                                  {student.badgeType}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                                >
                                  View Student
                                  <ArrowUpRight className="h-3.5 w-3.5 ml-1.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                                </Button>
                              </TableCell>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        )}

        {/* Counselor Tools - Shown in both modes */}
        <div className="space-y-3 max-w-full">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Counselor Tools
          </h2>
          <CounselorTools />
        </div>
      </main>

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

      {/* Onboarding Modal */}
      <OnboardingModal 
        open={isOnboardingModalOpen} 
        onOpenChange={handleOnboardingModalChange} 
      />
    </div>
  );
}
