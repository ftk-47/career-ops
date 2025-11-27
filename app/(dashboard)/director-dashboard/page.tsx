"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import { AnimatedCard } from "@/components/motion/animated-card";
import { PageHeader } from "@/components/page-header";
import { ThemeSelector } from "@/components/theme-selector";
import { StyleSelector } from "@/components/style-selector";
import { PrimaryKpisRow } from "@/components/dashboard/improved-kpi-cards";
import { CounselorTools } from "@/components/counselor-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  FileText,
  Video,
  UserRound,
  TrendingUp,
  CheckCircle2,
  Clock,
  FileSearch,
  ShieldAlert,
  MessageSquare,
  Target,
  Mail,
  Eye,
  Calendar,
  ChevronLeft,
  Check,
  Info,
  X,
  UserPlus,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

// Mock Data

// Section 4: Team Review Productivity
const teamProductivityMetrics = [
  {
    title: "Pending Reviews",
    value: "47",
    subtitle: "Across team",
    icon: Clock,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-500",
  },
  {
    title: "Avg Turnaround",
    value: "2.4 hrs",
    subtitle: "Last 7 days",
    icon: TrendingUp,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-500",
  },
  {
    title: "Reviews Completed",
    value: "284",
    subtitle: "This month",
    icon: CheckCircle2,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-500",
  },
];

const reviewerLoadData = [
  { reviewer: "Sarah K.", count: 42 },
  { reviewer: "John D.", count: 38 },
  { reviewer: "Emily R.", count: 35 },
  { reviewer: "Michael T.", count: 28 },
  { reviewer: "Lisa P.", count: 24 },
];

const chartConfig = {
  count: {
    label: "Reviews",
    color: "hsl(var(--primary))",
  },
};

// Section 5: Director Review Queue
type SubmissionType = "Resume" | "Cover Letter" | "Interview";
type ReviewStatus = "Pending" | "In Review" | "Completed";
type Priority = "High" | "Medium" | "Low";

interface DirectorReview {
  id: string;
  student: string;
  email: string;
  type: SubmissionType;
  aiScore: number;
  status: ReviewStatus;
  priority: Priority;
  initials: string;
}

const directorReviews: DirectorReview[] = [
  {
    id: "1",
    student: "Emma Wilson",
    email: "emma.w@university.edu",
    type: "Resume",
    aiScore: 94,
    status: "Pending",
    priority: "High",
    initials: "EW",
  },
  {
    id: "2",
    student: "James Rodriguez",
    email: "james.r@university.edu",
    type: "Interview",
    aiScore: 88,
    status: "In Review",
    priority: "High",
    initials: "JR",
  },
  {
    id: "3",
    student: "Lisa Chen",
    email: "lisa.c@university.edu",
    type: "Cover Letter",
    aiScore: 92,
    status: "Pending",
    priority: "Medium",
    initials: "LC",
  },
  {
    id: "4",
    student: "Daniel Kim",
    email: "daniel.k@university.edu",
    type: "Resume",
    aiScore: 85,
    status: "Pending",
    priority: "Medium",
    initials: "DK",
  },
  {
    id: "5",
    student: "Olivia Brown",
    email: "olivia.b@university.edu",
    type: "Interview",
    aiScore: 90,
    status: "Completed",
    priority: "Low",
    initials: "OB",
  },
  {
    id: "6",
    student: "Marcus Taylor",
    email: "marcus.t@university.edu",
    type: "Cover Letter",
    aiScore: 87,
    status: "Pending",
    priority: "Low",
    initials: "MT",
  },
];

const statusVariants: Record<ReviewStatus, "default" | "secondary" | "success"> = {
  "Pending": "secondary",
  "In Review": "default",
  "Completed": "success",
};

const priorityVariants: Record<Priority, "error" | "warning" | "secondary"> = {
  "High": "error",
  "Medium": "warning",
  "Low": "secondary",
};

const submissionTypeIcons: Record<SubmissionType, React.ElementType> = {
  Resume: FileText,
  "Cover Letter": Mail,
  Interview: Video,
};

// Section 6: AI Tools
const aiTools = [
  {
    id: "jd-decoder",
    title: "JD Decoder",
    description: "Surface key skills fast.",
    icon: FileSearch,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-500",
  },
  {
    id: "resume-red-flag",
    title: "Resume Red-Flag Detector",
    description: "Catch ATS blockers fast.",
    icon: ShieldAlert,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600 dark:text-red-500",
  },
  {
    id: "interview-analyzer",
    title: "Interview Analyzer",
    description: "Score answers for clarity.",
    icon: MessageSquare,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-500",
  },
  {
    id: "employer-alignment",
    title: "Employer Alignment",
    description: "Extract employer cues.",
    icon: Target,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-500",
  },
];

// Section 7: Activity Feed
interface ActivityEvent {
  id: string;
  type: "resume" | "interview" | "report" | "score" | "linkedin";
  student: string;
  action: string;
  timestamp: string;
  badgeVariant: "default" | "success" | "info" | "secondary";
}

const activityFeed: ActivityEvent[] = [
  {
    id: "1",
    type: "resume",
    student: "Emma Wilson",
    action: "Submitted resume for review",
    timestamp: "5 min ago",
    badgeVariant: "default",
  },
  {
    id: "2",
    type: "interview",
    student: "Michael Chen",
    action: "Started mock interview practice",
    timestamp: "12 min ago",
    badgeVariant: "info",
  },
  {
    id: "3",
    type: "report",
    student: "Sarah Jenkins",
    action: "Viewed interview report",
    timestamp: "28 min ago",
    badgeVariant: "secondary",
  },
  {
    id: "4",
    type: "score",
    student: "Alex Morgan",
    action: "Resume score improved to 78",
    timestamp: "1 hr ago",
    badgeVariant: "success",
  },
  {
    id: "5",
    type: "linkedin",
    student: "David Park",
    action: "Uploaded LinkedIn profile",
    timestamp: "2 hrs ago",
    badgeVariant: "info",
  },
  {
    id: "6",
    type: "resume",
    student: "Jessica Wu",
    action: "Created new resume",
    timestamp: "3 hrs ago",
    badgeVariant: "default",
  },
  {
    id: "7",
    type: "interview",
    student: "James Rodriguez",
    action: "Completed behavioral interview",
    timestamp: "4 hrs ago",
    badgeVariant: "success",
  },
  {
    id: "8",
    type: "score",
    student: "Lisa Chen",
    action: "Interview confidence up 12%",
    timestamp: "5 hrs ago",
    badgeVariant: "success",
  },
];

const activityIcons: Record<ActivityEvent["type"], React.ElementType> = {
  resume: FileText,
  interview: Video,
  report: Eye,
  score: TrendingUp,
  linkedin: UserRound,
};

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

export default function DirectorDashboard() {
  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  
  // Banner dismissal state with localStorage
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  
  // Check localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const dismissed = localStorage.getItem("demo-banner-dismissed") === "true";
    if (dismissed) {
      // Necessary for hydration: update state after mount to match localStorage
      // eslint-disable-next-line
      setIsBannerDismissed(true);
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

  return (
    <div className="flex flex-col w-full min-h-screen">
      <PageHeader
        title="Director Dashboard"
        description="University-wide insights and team oversight"
        actions={
          <div className="flex items-center gap-2">
            <StyleSelector />
            <ThemeSelector />
          </div>
        }
      />

      {/* Demo Banner */}
      {!isBannerDismissed && (
        <div className="w-full px-4 md:px-6 xl:px-8 py-4 bg-linear-to-r from-primary/10 via-primary/5 to-transparent">
          <div className="max-w-full rounded-lg border border-primary/30 bg-card shadow-sm">
            <div className="px-4 md:px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <span className="text-sm font-semibold">You&apos;re Viewing a Demo</span>
                    <span className="text-sm text-muted-foreground">
                      To get a personalized consultation and unlock full features, book a session with our experts.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button 
                    size="lg" 
                    onClick={() => setIsBookingOpen(true)}
                    className="whitespace-nowrap"
                  >
                    Book Consultation
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={handleDismissBanner}
                    className="h-10 w-10 p-0"
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
              Get started by exploring your dashboard and connecting with students.
            </p>
          </div>
        </div>
        {/* Section 1: Primary KPIs */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Primary KPIs
          </h2>
          <FadeIn delay={0.1} direction="up">
            <PrimaryKpisRow />
          </FadeIn>
        </div>

        {/* Quick Actions and Counselor Tools */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-4 max-w-full items-start">
          {/* Quick Actions */}
          <div className="space-y-3 lg:col-span-1 flex flex-col">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Quick Actions
            </h2>
            <Card className="rounded-xl py-0 shadow-sm border bg-card flex-1 flex flex-col">
              <CardContent className="p-4 space-y-2 flex-1 flex flex-col">
                {quickActions.map((action, index) => {
                  const isPrimary = index === 0;
                  return (
                    <AnimatedCard key={action.title} delay={index * 0.05}>
                      <Button
                        variant={isPrimary ? "default" : "outline"}
                        className={`w-full justify-start h-auto py-3 px-4 relative ${
                          isPrimary
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "bg-background hover:bg-muted border"
                        } transition-all duration-200`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className={`shrink-0 ${
                            isPrimary ? "text-primary-foreground" : "text-foreground"
                          }`}>
                            <action.icon className="h-5 w-5" />
                          </div>
                          <span className={`font-medium text-sm ${
                            action.badgeCount !== undefined && action.badgeCount > 0 ? "flex-1" : ""
                          } ${
                            isPrimary ? "text-primary-foreground" : "text-foreground"
                          }`}>
                            {action.title}
                          </span>
                          {action.badgeCount !== undefined && action.badgeCount > 0 && (
                            <Badge 
                              className={`h-5 min-w-5 px-1.5 flex items-center justify-center text-[10px] font-semibold rounded-full shrink-0 ${
                                isPrimary 
                                  ? "bg-amber-500 text-white border-2 border-amber-400/50 shadow-sm dark:bg-amber-600 dark:text-white dark:border-amber-500/50" 
                                  : "bg-amber-500 text-white border-2 border-amber-400/30 shadow-sm dark:bg-amber-600 dark:text-white dark:border-amber-500/30"
                              }`}
                            >
                              {action.badgeCount}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </AnimatedCard>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Counselor Tools */}
          <div className="space-y-3 lg:col-span-3 flex flex-col">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Counselor Tools
            </h2>
            <div className="flex-1 min-h-0">
              <CounselorTools />
            </div>
          </div>
        </div>

        {/* Section 4: Team Review Productivity */}
        <FadeIn delay={0.2} direction="up">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Team Review Productivity
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Team performance and workload distribution
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Metrics Row */}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {teamProductivityMetrics.map((metric) => (
                  <div
                    key={metric.title}
                    className="flex items-start gap-3 p-4 rounded-lg border bg-card"
                  >
                    <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                      <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold tracking-tight">
                        {metric.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {metric.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reviewer Load Distribution Chart */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Reviewer Load Distribution</h3>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <BarChart
                    data={reviewerLoadData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-xs"
                    />
                    <YAxis
                      type="category"
                      dataKey="reviewer"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-xs"
                      width={80}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="count"
                      fill="var(--color-count)"
                      radius={[0, 4, 4, 0]}
                      name="Reviews"
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Section 5: Director Review Queue */}
        <FadeIn delay={0.3} direction="up">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Your Review Queue
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Submissions requiring director-level review
              </p>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>AI Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <StaggerContainer
                    as="tbody"
                    delay={0.05}
                    staggerDelay={0.03}
                  >
                    {directorReviews.map((review) => {
                      const TypeIcon = submissionTypeIcons[review.type];
                      return (
                        <StaggerItem
                          key={review.id}
                          as="tr"
                          className="border-b transition-colors hover:bg-muted/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                                  {review.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{review.student}</p>
                                <p className="text-xs text-muted-foreground">
                                  {review.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <TypeIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{review.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="success" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              {review.aiScore}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusVariants[review.status]}>
                              {review.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={priorityVariants[review.priority]}>
                              {review.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="default">
                              Review
                            </Button>
                          </TableCell>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                </Table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Section 6: AI Tools */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            AI Tools
          </h2>
          <FadeIn delay={0.35} direction="up">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {aiTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-lg ${tool.iconBg}`}>
                        <tool.icon className={`h-5 w-5 ${tool.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Section 7: Activity Feed */}
        <FadeIn delay={0.4} direction="up">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">Activity Feed</CardTitle>
              <p className="text-xs text-muted-foreground">
                Recent platform activity and student engagement
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {activityFeed.map((event) => {
                    const EventIcon = activityIcons[event.type];
                    return (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-primary/10">
                          <EventIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-sm">{event.student}</p>
                            <span className="text-xs text-muted-foreground">
                              {event.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.action}</p>
                          <Badge variant={event.badgeVariant} className="text-xs">
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </FadeIn>
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
    </div>
  );
}

