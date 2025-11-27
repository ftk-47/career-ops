"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/motion/animated-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import { PageHeader } from "@/components/page-header";
import { ThemeSelector } from "@/components/theme-selector";
import { StyleSelector } from "@/components/style-selector";
import { CounselorTools } from "@/components/counselor-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Users,
  Zap,
  TrendingUp,
  Mail,
  FileText,
  ArrowUpRight,
  CheckCircle2,
  MoreVertical,
  Eye,
  FileEdit,
  Video,
  X,
  Info,
  Calendar,
  UserRound,
  ChevronLeft,
  Check,
  ExternalLink,
} from "lucide-react";

// Mock Data
const performanceData = [
  { name: "Mon", total: 145, human: 12 },
  { name: "Tue", total: 230, human: 18 },
  { name: "Wed", total: 185, human: 15 },
  { name: "Thu", total: 270, human: 22 },
  { name: "Fri", total: 190, human: 14 },
  { name: "Sat", total: 50, human: 4 },
  { name: "Sun", total: 85, human: 8 },
];

const studentsWatchlist = [
  {
    id: 1,
    name: "Alex Morgan",
    major: "Computer Science",
    issue: "Resume Score < 40",
    daysInactive: 12,
    initials: "AM",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    major: "Marketing",
    issue: "No Interview Practice",
    daysInactive: 5,
    initials: "SJ",
  },
  {
    id: 3,
    name: "Michael Chen",
    major: "Finance",
    issue: "Profile Incomplete",
    daysInactive: 20,
    initials: "MC",
  },
  {
    id: 4,
    name: "Jessica Wu",
    major: "Design",
    issue: "Resume Score Stagnant",
    daysInactive: 8,
    initials: "JW",
  },
];

type SubmissionType = "Resume" | "Cover Letter" | "Interview";
type SubmissionStatus = "In Queue" | "In Review" | "Completed";

interface Review {
  id: string;
  student: string;
  email: string;
  major: string;
  doc: string;
  type: SubmissionType;
  aiScore: number;
  query: string;
  status: SubmissionStatus;
  time: string;
  initials: string;
}

const recentReviews: Review[] = [
  {
    id: "1",
    student: "David Kim",
    email: "david.k@university.edu",
    major: "CS",
    doc: "Google_Resume_Final.pdf",
    type: "Resume",
    aiScore: 98,
    query: "Is the summary strong enough?",
    status: "In Queue",
    time: "2 hrs ago",
    initials: "DK",
  },
  {
    id: "2",
    student: "Emma Wilson",
    email: "emma.w@university.edu",
    major: "Psychology",
    doc: "Cover_Letter_Draft.docx",
    type: "Cover Letter",
    aiScore: 92,
    query: "Tone check please",
    status: "In Queue",
    time: "4 hrs ago",
    initials: "EW",
  },
  {
    id: "3",
    student: "James Rod",
    email: "james.r@university.edu",
    major: "Business",
    doc: "Consulting_Case.pdf",
    type: "Interview",
    aiScore: 95,
    query: "Mock interview review",
    status: "In Review",
    time: "5 hrs ago",
    initials: "JR",
  },
  {
    id: "4",
    student: "Lisa Park",
    email: "lisa.p@university.edu",
    major: "Economics",
    doc: "Market_Analysis_Resume.pdf",
    type: "Resume",
    aiScore: 88,
    query: "Feedback on formatting",
    status: "In Queue",
    time: "1 day ago",
    initials: "LP",
  },
  {
    id: "5",
    student: "Michael Chen",
    email: "michael.c@university.edu",
    major: "Finance",
    doc: "Goldman_Sachs_Cover.docx",
    type: "Cover Letter",
    aiScore: 94,
    query: "Does this sound too generic?",
    status: "In Queue",
    time: "3 hrs ago",
    initials: "MC",
  },
  {
    id: "6",
    student: "Sarah Johnson",
    email: "sarah.j@university.edu",
    major: "Marketing",
    doc: "Tech_Resume_v3.pdf",
    type: "Resume",
    aiScore: 96,
    query: "Is my experience section compelling?",
    status: "Completed",
    time: "1 day ago",
    initials: "SJ",
  },
  {
    id: "7",
    student: "Alex Martinez",
    email: "alex.m@university.edu",
    major: "Engineering",
    doc: "Behavioral_Interview_Prep.mp4",
    type: "Interview",
    aiScore: 90,
    query: "Need feedback on body language",
    status: "In Queue",
    time: "6 hrs ago",
    initials: "AM",
  },
  {
    id: "8",
    student: "Olivia Brown",
    email: "olivia.b@university.edu",
    major: "Design",
    doc: "Adobe_Application_Letter.docx",
    type: "Cover Letter",
    aiScore: 97,
    query: "Is the creative tone appropriate?",
    status: "In Review",
    time: "4 hrs ago",
    initials: "OB",
  },
];

const chartConfig = {
  total: {
    label: "Resumes Processed",
    color: "#10b981",
  },
};


// Top 10 Resume Issues by Cohort
const resumeIssuesByCohort: Record<string, Array<{ issue: string; count: number }>> = {
  "cs-2025": [
    { issue: "Weak Action Verbs", count: 156 },
    { issue: "Missing Metrics", count: 142 },
    { issue: "Poor Formatting", count: 128 },
    { issue: "Typos & Grammar", count: 115 },
    { issue: "Vague Descriptions", count: 98 },
    { issue: "Inconsistent Dates", count: 87 },
    { issue: "Missing Keywords", count: 76 },
    { issue: "Too Lengthy", count: 64 },
    { issue: "Generic Objectives", count: 52 },
    { issue: "Contact Info Issues", count: 41 },
  ],
  "business-2025": [
    { issue: "Missing Metrics", count: 178 },
    { issue: "Weak Action Verbs", count: 165 },
    { issue: "Vague Descriptions", count: 134 },
    { issue: "Poor Formatting", count: 121 },
    { issue: "Generic Objectives", count: 98 },
    { issue: "Typos & Grammar", count: 89 },
    { issue: "Missing Keywords", count: 72 },
    { issue: "Inconsistent Dates", count: 68 },
    { issue: "Too Lengthy", count: 55 },
    { issue: "Contact Info Issues", count: 38 },
  ],
  "design-2025": [
    { issue: "Poor Formatting", count: 145 },
    { issue: "Missing Portfolio Link", count: 132 },
    { issue: "Weak Action Verbs", count: 118 },
    { issue: "Vague Descriptions", count: 106 },
    { issue: "Missing Metrics", count: 94 },
    { issue: "Typos & Grammar", count: 81 },
    { issue: "Inconsistent Dates", count: 73 },
    { issue: "Missing Keywords", count: 62 },
    { issue: "Generic Objectives", count: 49 },
    { issue: "Too Lengthy", count: 37 },
  ],
};

const statusVariants: Record<SubmissionStatus, "default" | "secondary" | "success"> = {
  "In Queue": "secondary",
  "In Review": "default",
  "Completed": "success",
};

const submissionTypeIcons: Record<SubmissionType, React.ElementType> = {
  Resume: FileText,
  "Cover Letter": Mail,
  Interview: Video,
};

export default function Dashboard() {
  const [selectedCohort, setSelectedCohort] = useState("cs-2025");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedReviewIds, setSelectedReviewIds] = useState<Set<string>>(new Set());
  
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

  // Filter reviews by tab
  const filteredReviews = recentReviews.filter((review) => {
    if (activeTab === "all") return true;
    if (activeTab === "resumes") return review.type === "Resume";
    if (activeTab === "cover-letters") return review.type === "Cover Letter";
    if (activeTab === "interviews") return review.type === "Interview";
    return true;
  });

  const toggleSelectReview = (id: string) => {
    const newSelected = new Set(selectedReviewIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedReviewIds(newSelected);
  };

  const toggleSelectAllReviews = () => {
    if (selectedReviewIds.size === filteredReviews.length) {
      setSelectedReviewIds(new Set());
    } else {
      setSelectedReviewIds(new Set(filteredReviews.map((r) => r.id)));
    }
  };


  // Impact Stats Data
  const impactStats = [
    {
      title: "Active Students",
      value: "1,240",
      trend: "+12%",
      trendLabel: "from last month",
      icon: Users,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      href: "/student-portfolio",
    },
    {
      title: "Students at Target Score",
      value: "64%",
      subtitle: "Score ≥ 80",
      icon: CheckCircle2,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-500",
      href: "/student-portfolio",
    },
  ];

  // Progress Stats Data
  const progressStats = [
    {
      title: "Resume Created",
      value: "1,860",
      subtitle: "Resumes processed",
      icon: Zap,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-500",
      href: "/student-portfolio",
      trend: undefined,
      trendLabel: undefined,
    },
    {
      title: "Avg. Improvement / Student",
      value: "+18.2",
      subtitle: "Points gained",
      icon: TrendingUp,
      iconBg: "bg-emerald-500/10", 
      iconColor: "text-emerald-600 dark:text-emerald-500",
      href: "/student-portfolio",
      trend: undefined,
      trendLabel: undefined,
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen ">
      <PageHeader
        title="Dashboard"
        description="Manage your career operations effortlessly."
        actions={
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                className="gap-2 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                View as Student
              </Button>
            </motion.div>
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

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden p-4 md:p-6 xl:p-8 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between max-w-full">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Welcome, Sarah</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Get started by exploring your dashboard and connecting with students.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* <Button size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              Invite Students
            </Button> */}
          </div>
        </div>

        {/* Counselor Tools */}
        <div className="space-y-3 max-w-full">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Counselor Tools
          </h2>
          <CounselorTools />
        </div>

        {/* Impact Overview */}
        <div className="space-y-3 max-w-full">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Impact Overview
          </h2>
          <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 max-w-full">
            {impactStats.map((stat, index) => (
              <AnimatedCard key={stat.title} delay={index * 0.05}>
                <Link href={stat.href}>
                  <Card className="rounded-xl shadow-sm py-0 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer group relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                            {stat.trend && (
                              <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                                <ArrowUpRight className="h-3 w-3" />
                                {stat.trend}
                              </span>
                            )}
                          </div>
                          {stat.subtitle && (
                            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                          )}
                          {stat.trendLabel && (
                            <p className="text-xs text-muted-foreground">{stat.trendLabel}</p>
                          )}
                        </div>
                        <div className={`p-2.5 rounded-lg ${stat.iconBg} transition-transform group-hover:scale-110`}>
                          <stat.icon className={`h-4.5 w-4.5 ${stat.iconColor}`} />
                        </div>
                      </div>
                      <div className="absolute bottom-6 right-6 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        View Details
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Progress Metrics */}
        <div className="space-y-3 max-w-full">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Progress Metrics
          </h2>
          <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 max-w-full">
            {progressStats.map((stat, index) => (
              <AnimatedCard key={stat.title} delay={index * 0.05}>
                <Link href={stat.href}>
                  <Card className="rounded-xl shadow-sm py-0 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer group relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                            {stat.trend && (
                              <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                                <ArrowUpRight className="h-3 w-3" />
                                {stat.trend}
                              </span>
                            )}
                          </div>
                          {stat.subtitle && (
                            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                          )}
                          {stat.trendLabel && (
                            <p className="text-xs text-muted-foreground">{stat.trendLabel}</p>
                          )}
                        </div>
                        <div className={`p-2.5 rounded-lg ${stat.iconBg} transition-transform group-hover:scale-110`}>
                          <stat.icon className={`h-4.5 w-4.5 ${stat.iconColor}`} />
                        </div>
                      </div>
                      <div className="absolute bottom-6 right-6 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        View Details
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 xl:grid-cols-12 max-w-full">
          {/* Efficiency Engine Chart */}
          <div className="xl:col-span-8">
            <FadeIn delay={0.3} direction="up">
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-600" />
                    Resumes Processed by Hiration AI
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Automated formatting, ATS optimization, and quality checks this week.
                  </p>
                </CardHeader>
                <CardContent className="overflow-hidden">
                  <ChartContainer config={chartConfig} className="h-[350px] w-full max-w-full">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs"
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#fillTotal)"
                        name="Resumes Processed"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Priority Watchlist */}
          <div className="xl:col-span-4">
            <FadeIn delay={0.35} direction="up">
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    Students Needing Attention
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Low engagement or stuck scores.
                  </p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-3">
                      {studentsWatchlist.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                              {student.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="font-medium text-sm leading-none">
                              {student.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {student.major}
                            </p>
                            <Badge
                              variant="warning"
                              className="text-xs"
                            >
                              {student.issue}
                            </Badge>
                          </div>
                          <Button size="icon" variant="ghost" className="shrink-0">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>

        {/* Resume Insights */}
        <FadeIn delay={0.4} direction="up">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-medium">
                    Top 10 Resume Issues
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Most common issues identified by AI across cohorts
                  </p>
                </div>
                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select cohort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs-2025">CS 2025</SelectItem>
                    <SelectItem value="business-2025">Business 2025</SelectItem>
                    <SelectItem value="design-2025">Design 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <ChartContainer 
                config={{
                  count: {
                    label: "Issues Found",
                    color: "hsl(var(--primary))",
                  },
                }} 
                className="h-[400px] w-full max-w-full"
              >
                <BarChart 
                  data={resumeIssuesByCohort[selectedCohort] || []}
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
                    dataKey="issue"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs"
                    width={150}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="var(--color-count)"
                    radius={[0, 4, 4, 0]}
                    name="Issues Found"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Strategic Inbox */}
        <FadeIn delay={0.5} direction="up">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Incoming Review Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Requests</TabsTrigger>
                  <TabsTrigger value="resumes">Resumes</TabsTrigger>
                  <TabsTrigger value="cover-letters">Cover Letters</TabsTrigger>
                  <TabsTrigger value="interviews">Mock Interviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-0">
                  <div className="rounded-lg border overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox
                              checked={
                                selectedReviewIds.size === filteredReviews.length &&
                                filteredReviews.length > 0
                              }
                              onCheckedChange={toggleSelectAllReviews}
                              aria-label="Select all"
                            />
                          </TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>AI Check</TableHead>
                          <TableHead>Query</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <StaggerContainer
                        key={activeTab}
                        as="tbody"
                        delay={0.05}
                        staggerDelay={0.03}
                      >
                        {filteredReviews.map((review) => {
                          const TypeIcon = submissionTypeIcons[review.type];
                          return (
                            <StaggerItem
                              key={review.id}
                              as="tr"
                              className="border-b transition-colors hover:bg-muted/50"
                            >
                              <TableCell>
                                <Checkbox
                                  checked={selectedReviewIds.has(review.id)}
                                  onCheckedChange={() => toggleSelectReview(review.id)}
                                  aria-label={`Select ${review.student}`}
                                />
                              </TableCell>
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
                                <Badge
                                  variant="success"
                                  className="gap-1"
                                >
                                  <CheckCircle2 className="h-3 w-3" />
                                  {review.aiScore}%
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                  {review.query}
                                </p>
                              </TableCell>
                              <TableCell>
                                <Badge variant={statusVariants[review.status]}>
                                  {review.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <FileEdit className="mr-2 h-4 w-4" />
                                      Review
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </StaggerItem>
                          );
                        })}
                      </StaggerContainer>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
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

