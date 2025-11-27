"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import { PageHeader } from "@/components/page-header";
import { ThemeSelector } from "@/components/theme-selector";
import { StyleSelector } from "@/components/style-selector";
import { PrimaryKpisRow } from "@/components/dashboard/improved-kpi-cards";
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
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  FileSearch,
  ShieldAlert,
  MessageSquare,
  Target,
  Mail,
  Eye,
} from "lucide-react";

// Mock Data

// Section 2: AI Impact & Engagement
const aiImpactMetrics = [
  {
    id: "avg-resume",
    title: "Avg Resume Score",
    value: "82.4",
    subtitle: "Out of 100",
    delta: "+4.2",
    deltaType: "positive" as const,
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-500",
  },
  {
    id: "avg-interview",
    title: "Avg Interview Confidence",
    value: "78%",
    subtitle: "Self-reported",
    delta: "+6%",
    deltaType: "positive" as const,
    icon: TrendingUp,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-500",
  },
  {
    id: "red-flags",
    title: "Red Flags Found",
    value: "156",
    subtitle: "This week",
    delta: "-8%",
    deltaType: "positive" as const,
    icon: AlertTriangle,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-500",
  },
  {
    id: "improvement",
    title: "Score Improvement",
    value: "+18.2",
    subtitle: "Past 30 days",
    delta: "+2.1",
    deltaType: "positive" as const,
    icon: TrendingUp,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-500",
  },
  {
    id: "resume-adoption",
    title: "Resume Adoption",
    value: "89%",
    subtitle: "≥ 1 resume created",
    delta: "+5%",
    deltaType: "positive" as const,
    icon: FileText,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600 dark:text-rose-500",
  },
  {
    id: "interview-adoption",
    title: "Interview Practice",
    value: "72%",
    subtitle: "≥ 1 interview done",
    delta: "+8%",
    deltaType: "positive" as const,
    icon: Video,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-500",
  },
];

// Section 3: Students Needing Attention
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

export default function DirectorDashboard() {
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

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 xl:p-8 space-y-8">
        {/* Section 1: Primary KPIs */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Primary KPIs
          </h2>
          <FadeIn delay={0.1} direction="up">
            <PrimaryKpisRow />
          </FadeIn>
        </div>

        {/* Section 2: AI Impact & Engagement */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            AI Impact & Engagement
          </h2>
          <FadeIn delay={0.15} direction="up">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {aiImpactMetrics.map((metric) => (
                <Card key={metric.id} className="rounded-xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 rounded-lg ${metric.iconBg}`}>
                        <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
                      </div>
                      <div className="flex items-center gap-1">
                        {metric.deltaType === "positive" ? (
                          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            metric.deltaType === "positive"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {metric.delta}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Section 3 & 4: Team Productivity + Students Needing Attention */}
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-12">
          {/* Section 4: Team Review Productivity */}
          <div className="xl:col-span-8">
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
          </div>

          {/* Section 3: Students Needing Attention */}
          <div className="xl:col-span-4">
            <FadeIn delay={0.25} direction="up">
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    Students Needing Attention
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Require immediate follow-up
                  </p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {studentsNeedingAttention.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                              {student.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0 space-y-2">
                            <div>
                              <p className="font-medium text-sm leading-none">
                                {student.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {student.email}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {student.issue}
                            </p>
                            <Badge variant={student.badgeVariant} className="text-xs">
                              {student.badgeType}
                            </Badge>
                            <Button size="sm" variant="outline" className="w-full mt-2">
                              View Student
                              <ArrowUpRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>

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
    </div>
  );
}

