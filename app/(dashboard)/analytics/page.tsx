"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatedCard } from "@/components/motion/animated-card";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHeader } from "@/components/page-header";
import { ThemeSelector } from "@/components/theme-selector";
import { StyleSelector } from "@/components/style-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Line,
  LineChart,
} from "recharts";
import {
  Users,
  UserPlus,
  UserCheck,
  Activity,
  FileText,
  Download,
  TrendingUp,
  Award,
  Video,
  MessageSquare,
  Target,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data - Students
interface StudentMetrics {
  total: number;
  trend: string;
  newSignups: number;
  signupsTrend: string;
  pendingInvites: number;
  activeRate: number;
}

const studentMetricsByCohort: Record<string, StudentMetrics> = {
  "all": {
    total: 1240,
    trend: "+12%",
    newSignups: 87,
    signupsTrend: "+23%",
    pendingInvites: 45,
    activeRate: 78,
  },
  "cs-2025": {
    total: 420,
    trend: "+15%",
    newSignups: 32,
    signupsTrend: "+28%",
    pendingInvites: 18,
    activeRate: 82,
  },
  "business-2025": {
    total: 385,
    trend: "+10%",
    newSignups: 28,
    signupsTrend: "+20%",
    pendingInvites: 15,
    activeRate: 75,
  },
  "design-2025": {
    total: 435,
    trend: "+11%",
    newSignups: 27,
    signupsTrend: "+22%",
    pendingInvites: 12,
    activeRate: 77,
  },
};

const signupTrendData = [
  { month: "Jun", signups: 145 },
  { month: "Jul", signups: 178 },
  { month: "Aug", signups: 210 },
  { month: "Sep", signups: 195 },
  { month: "Oct", signups: 234 },
  { month: "Nov", signups: 278 },
];

const cohortDistributionData = [
  { name: "CS 2025", value: 420, fill: "#10b981" },
  { name: "Business 2025", value: 385, fill: "#3b82f6" },
  { name: "Design 2025", value: 435, fill: "#8b5cf6" },
];

const activityFunnelData = [
  { stage: "Invited", count: 1485, percentage: 100, color: "#10b981" },
  { stage: "Signed Up", count: 1240, percentage: 84, color: "#3b82f6" },
  { stage: "Active (7d)", count: 967, percentage: 78, color: "#8b5cf6" },
  { stage: "Profile Complete", count: 856, percentage: 69, color: "#ec4899" },
];

const studentsNeedingAttention = [
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

// Mock Data - Resumes
interface ResumeMetrics {
  total: number;
  downloads: number;
  avgScore: number;
  highPerformers: number;
}

const resumeMetricsByCohort: Record<string, ResumeMetrics> = {
  "all": {
    total: 3850,
    downloads: 2940,
    avgScore: 72.4,
    highPerformers: 64,
  },
  "cs-2025": {
    total: 1320,
    downloads: 1050,
    avgScore: 74.2,
    highPerformers: 68,
  },
  "business-2025": {
    total: 1180,
    downloads: 920,
    avgScore: 71.8,
    highPerformers: 62,
  },
  "design-2025": {
    total: 1350,
    downloads: 970,
    avgScore: 71.2,
    highPerformers: 61,
  },
};

const scoreDistributionData = [
  { range: "0-20", count: 45 },
  { range: "21-40", count: 128 },
  { range: "41-60", count: 342 },
  { range: "61-80", count: 876 },
  { range: "81-100", count: 459 },
];

const resumeScoreTrendData = [
  { week: "Week 1", score: 68.2 },
  { week: "Week 2", score: 69.5 },
  { week: "Week 3", score: 70.1 },
  { week: "Week 4", score: 71.3 },
  { week: "Week 5", score: 71.8 },
  { week: "Week 6", score: 72.4 },
];

const commonIssuesData = [
  { issue: "Weak Action Verbs", count: 456 },
  { issue: "Missing Metrics", count: 398 },
  { issue: "Poor Formatting", count: 367 },
  { issue: "Typos & Grammar", count: 312 },
  { issue: "Vague Descriptions", count: 289 },
  { issue: "Inconsistent Dates", count: 245 },
  { issue: "Missing Keywords", count: 198 },
  { issue: "Too Lengthy", count: 167 },
];

// Mock Data - Interviews
interface InterviewMetrics {
  total: number;
  avgOverall: number;
  avgPosture: number;
  avgSpeech: number;
}

const interviewMetricsByCohort: Record<string, InterviewMetrics> = {
  "all": {
    total: 892,
    avgOverall: 7.8,
    avgPosture: 8.2,
    avgSpeech: 7.6,
  },
  "cs-2025": {
    total: 315,
    avgOverall: 8.1,
    avgPosture: 8.4,
    avgSpeech: 7.9,
  },
  "business-2025": {
    total: 298,
    avgOverall: 7.7,
    avgPosture: 8.1,
    avgSpeech: 7.5,
  },
  "design-2025": {
    total: 279,
    avgOverall: 7.6,
    avgPosture: 8.0,
    avgSpeech: 7.4,
  },
};

const interviewScoreCategories = [
  { category: "Posture", score: 82 },
  { category: "Speech", score: 76 },
  { category: "Answer Quality", score: 78 },
  { category: "Confidence", score: 74 },
  { category: "Eye Contact", score: 80 },
];

const interviewCompletionTrend = [
  { week: "Week 1", interviews: 118 },
  { week: "Week 2", interviews: 134 },
  { week: "Week 3", interviews: 142 },
  { week: "Week 4", interviews: 156 },
  { week: "Week 5", interviews: 168 },
  { week: "Week 6", interviews: 174 },
];

const interviewTypeScores = [
  { type: "Technical", avgScore: 7.9 },
  { type: "Behavioral", avgScore: 8.1 },
  { type: "Case Study", avgScore: 7.4 },
  { type: "Leadership", avgScore: 7.7 },
];

const commonFeedbackAreas = [
  "Improve eye contact during responses",
  "Reduce filler words (um, uh, like)",
  "Provide more specific examples",
  "Better structure in STAR format",
  "Speak with more confidence",
];

// Mock Data - LinkedIn
interface LinkedInMetrics {
  uploaded: number;
  optimized: number;
  avgScore: number;
  highScorers: number;
}

const linkedinMetricsByCohort: Record<string, LinkedInMetrics> = {
  "all": {
    uploaded: 1045,
    optimized: 823,
    avgScore: 68.5,
    highScorers: 58,
  },
  "cs-2025": {
    uploaded: 362,
    optimized: 295,
    avgScore: 70.2,
    highScorers: 62,
  },
  "business-2025": {
    uploaded: 348,
    optimized: 278,
    avgScore: 67.8,
    highScorers: 56,
  },
  "design-2025": {
    uploaded: 335,
    optimized: 250,
    avgScore: 67.5,
    highScorers: 55,
  },
};

const linkedinScoreDistribution = [
  { range: "0-20", count: 32 },
  { range: "21-40", count: 98 },
  { range: "41-60", count: 287 },
  { range: "61-80", count: 421 },
  { range: "81-100", count: 207 },
];


const linkedinCommonIssues = [
  { issue: "Weak Headline", count: 342 },
  { issue: "Missing Summary", count: 298 },
  { issue: "Incomplete Experience", count: 267 },
  { issue: "Few Skills Listed", count: 234 },
  { issue: "No Custom URL", count: 198 },
  { issue: "Missing Keywords", count: 176 },
];

const sectionCompleteness = [
  { section: "Headline", completeness: 85, color: "#10b981" },
  { section: "Summary", completeness: 72, color: "#3b82f6" },
  { section: "Experience", completeness: 78, color: "#8b5cf6" },
  { section: "Skills", completeness: 68, color: "#ec4899" },
  { section: "Education", completeness: 92, color: "#06b6d4" },
];

export default function AnalyticsPage() {
  const [selectedCohort, setSelectedCohort] = useState("all");
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const validTabs = ["students", "resumes", "interviews", "linkedin"];
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : "students";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <PageHeader
        title="Analytics"
        description="Comprehensive insights across students, resumes, interviews, and LinkedIn profiles."
        actions={
          <div className="flex items-center gap-2">
            <StyleSelector />
            <ThemeSelector />
          </div>
        }
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden p-4 md:p-6 xl:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="students">
              <Users className="h-4 w-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="resumes">
              <FileText className="h-4 w-4 mr-2" />
              Resumes
            </TabsTrigger>
            <TabsTrigger value="interviews">
              <Video className="h-4 w-4 mr-2" />
              Interviews
            </TabsTrigger>
            <TabsTrigger value="linkedin">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Student Analytics</h2>
              <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select cohort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cohorts</SelectItem>
                  <SelectItem value="cs-2025">CS 2025</SelectItem>
                  <SelectItem value="business-2025">Business 2025</SelectItem>
                  <SelectItem value="design-2025">Design 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Top Metrics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              <AnimatedCard delay={0}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Students
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {studentMetricsByCohort[selectedCohort].total.toLocaleString()}
                          </p>
                            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                            {studentMetricsByCohort[selectedCohort].trend}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">from last month</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-blue-500/10">
                        <Users className="h-4.5 w-4.5 text-blue-600 dark:text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.05}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          New Signups
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {studentMetricsByCohort[selectedCohort].newSignups}
                          </p>
                          <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                            {studentMetricsByCohort[selectedCohort].signupsTrend}
                          </span>
          </div>
                        <p className="text-xs text-muted-foreground">this month</p>
        </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/10">
                        <UserPlus className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.1}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Pending Invites
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {studentMetricsByCohort[selectedCohort].pendingInvites}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">yet to sign up</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-orange-500/10">
                        <Clock className="h-4.5 w-4.5 text-orange-600 dark:text-orange-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.15}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Active Rate
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {studentMetricsByCohort[selectedCohort].activeRate}%
                          </p>
          </div>
                        <p className="text-xs text-muted-foreground">last 7 days</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-violet-500/10">
                        <Activity className="h-4.5 w-4.5 text-violet-600 dark:text-violet-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
        </div>

            {/* Detailed Insights */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-12">
              {/* Signup Trend */}
          <div className="xl:col-span-8">
                <FadeIn delay={0.2}>
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                      <CardTitle className="text-base font-medium">
                        Signup Trend
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                        New student registrations over the last 6 months
                  </p>
                </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          signups: {
                            label: "Signups",
                            color: "#10b981",
                          },
                        }}
                        className="h-[300px] w-full"
                      >
                        <LineChart data={signupTrendData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                            dataKey="month"
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
                            cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                            content={<ChartTooltipContent />}
                      />
                          <Line
                        type="monotone"
                            dataKey="signups"
                            stroke="var(--color-signups)"
                            strokeWidth={3}
                            dot={{ fill: "var(--color-signups)", r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                            activeDot={{ r: 7, strokeWidth: 2 }}
                            name="Signups"
                          />
                        </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

              {/* Cohort Distribution */}
          <div className="xl:col-span-4">
                <FadeIn delay={0.25}>
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        Cohort Distribution
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Students by cohort
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cohortDistributionData.map((cohort) => (
                          <div key={cohort.name} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="h-3 w-3 rounded-full" 
                                  style={{ backgroundColor: cohort.fill }}
                                />
                                <span className="font-medium">{cohort.name}</span>
                              </div>
                              <span className="text-muted-foreground">
                                {cohort.value}
                              </span>
                            </div>
                            <Progress
                              value={(cohort.value / 1240) * 100}
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>

            {/* Activity Funnel & Students Needing Attention */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
              <FadeIn delay={0.3}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Student Activity Funnel
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Conversion from invite to active user
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityFunnelData.map((stage) => (
                        <div key={stage.stage} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div 
                                className="h-3 w-3 rounded-full" 
                                style={{ backgroundColor: stage.color }}
                              />
                              <span className="font-medium">{stage.stage}</span>
                            </div>
                            <span className="text-muted-foreground">
                              {stage.count} ({stage.percentage}%)
                            </span>
                          </div>
                          <Progress 
                            value={stage.percentage} 
                            className="h-3"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.35}>
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    Students Needing Attention
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                      Low engagement or stuck scores
                  </p>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[280px] pr-4">
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
                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="font-medium text-sm leading-none">
                              {student.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {student.major}
                            </p>
                              <Badge variant="warning" className="text-xs">
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
          </TabsContent>

          {/* Resumes Tab */}
          <TabsContent value="resumes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Resume Analytics</h2>
              <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select cohort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cohorts</SelectItem>
                  <SelectItem value="cs-2025">CS 2025</SelectItem>
                  <SelectItem value="business-2025">Business 2025</SelectItem>
                  <SelectItem value="design-2025">Design 2025</SelectItem>
                </SelectContent>
              </Select>
        </div>

            {/* Top Metrics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              <AnimatedCard delay={0}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Resumes
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {resumeMetricsByCohort[selectedCohort].total.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">created on platform</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-blue-500/10">
                        <FileText className="h-4.5 w-4.5 text-blue-600 dark:text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.05}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Downloads
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {resumeMetricsByCohort[selectedCohort].downloads.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">total downloads</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/10">
                        <Download className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.1}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Avg AI Score
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {resumeMetricsByCohort[selectedCohort].avgScore}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">out of 100</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-violet-500/10">
                        <TrendingUp className="h-4.5 w-4.5 text-violet-600 dark:text-violet-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.15}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          High Performers
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {resumeMetricsByCohort[selectedCohort].highPerformers}%
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">scoring 80+</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-500/10">
                        <Award className="h-4.5 w-4.5 text-amber-600 dark:text-amber-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>

            {/* Detailed Insights */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
              {/* Score Distribution */}
              <FadeIn delay={0.2}>
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
                  <CardTitle className="text-base font-medium">
                      AI Score Distribution
                  </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Resume scores across all students
                    </p>
                  </CardHeader>
                  <CardContent>
                      <ChartContainer
                        config={{
                          count: {
                            label: "Resumes",
                            color: "#3b82f6",
                          },
                        }}
                        className="h-[300px] w-full"
                      >
                        <BarChart data={scoreDistributionData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="range"
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
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                            content={<ChartTooltipContent />}
                          />
                          <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={[6, 6, 0, 0]}
                            name="Resumes"
                          />
                        </BarChart>
                      </ChartContainer>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Score Trend */}
              <FadeIn delay={0.25}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Resume Score Trend
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Average score improvement over time
                    </p>
                  </CardHeader>
                  <CardContent>
                      <ChartContainer
                        config={{
                          score: {
                            label: "Avg Score",
                            color: "#8b5cf6",
                          },
                        }}
                        className="h-[300px] w-full"
                      >
                        <AreaChart data={resumeScoreTrendData}>
                          <defs>
                            <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                              <stop
                                offset="5%"
                                stopColor="var(--color-score)"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="var(--color-score)"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="week"
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
                            domain={[65, 75]}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                          />
                          <Area
                            type="monotone"
                            dataKey="score"
                            stroke="var(--color-score)"
                            strokeWidth={2}
                            fill="url(#fillScore)"
                            name="Avg Score"
                          />
                        </AreaChart>
                      </ChartContainer>
                  </CardContent>
                </Card>
              </FadeIn>
                </div>

            {/* Common Issues & ATS Pass Rate */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <FadeIn delay={0.3}>
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        Most Common Issues
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Top issues identified by AI across all resumes
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          count: {
                            label: "Issues Found",
                            color: "#f59e0b",
                          },
                        }}
                        className="h-[350px] w-full"
                      >
                        <BarChart
                          data={commonIssuesData}
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
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                            content={<ChartTooltipContent />}
                          />
                          <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={[0, 6, 6, 0]}
                            name="Issues Found"
                          />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>

              <div className="xl:col-span-4">
                <FadeIn delay={0.35}>
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        ATS Pass Rate
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Resumes passing ATS checks
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Overall Pass Rate</span>
                          <span className="text-muted-foreground">87%</span>
                        </div>
                        <Progress value={87} className="h-3" />
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                              <span>Formatting</span>
                            </div>
                            <span className="text-muted-foreground">92%</span>
                          </div>
                          <Progress 
                            value={92} 
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                              <span>Keywords</span>
                            </div>
                            <span className="text-muted-foreground">85%</span>
                          </div>
                          <Progress 
                            value={85} 
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                              <span>Structure</span>
                            </div>
                            <span className="text-muted-foreground">89%</span>
                          </div>
                          <Progress 
                            value={89} 
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                              <span>Content Quality</span>
                            </div>
                            <span className="text-muted-foreground">83%</span>
                          </div>
                          <Progress 
                            value={83} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Interview Analytics</h2>
                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select cohort" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="all">All Cohorts</SelectItem>
                    <SelectItem value="cs-2025">CS 2025</SelectItem>
                    <SelectItem value="business-2025">Business 2025</SelectItem>
                    <SelectItem value="design-2025">Design 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            {/* Top Metrics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              <AnimatedCard delay={0}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Interviews
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {interviewMetricsByCohort[selectedCohort].total.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">completed</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-blue-500/10">
                        <Video className="h-4.5 w-4.5 text-blue-600 dark:text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.05}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Avg Overall Score
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {interviewMetricsByCohort[selectedCohort].avgOverall}
                          </p>
                          <span className="text-sm text-muted-foreground">/10</span>
                        </div>
                        <p className="text-xs text-muted-foreground">AI evaluation</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/10">
                        <Target className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.1}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Avg Posture Score
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {interviewMetricsByCohort[selectedCohort].avgPosture}
                          </p>
                          <span className="text-sm text-muted-foreground">/10</span>
                        </div>
                        <p className="text-xs text-muted-foreground">body language</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-violet-500/10">
                        <UserCheck className="h-4.5 w-4.5 text-violet-600 dark:text-violet-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.15}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Avg Speech Score
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {interviewMetricsByCohort[selectedCohort].avgSpeech}
                          </p>
                          <span className="text-sm text-muted-foreground">/10</span>
                        </div>
                        <p className="text-xs text-muted-foreground">clarity</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-500/10">
                        <MessageSquare className="h-4.5 w-4.5 text-amber-600 dark:text-amber-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>

            {/* Detailed Insights */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
              {/* Score Categories Radar */}
              <FadeIn delay={0.2}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Score Categories
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Performance across different evaluation criteria
                    </p>
            </CardHeader>
                  <CardContent>
                      <ChartContainer
                        config={{
                          score: {
                            label: "Score",
                            color: "#ec4899",
                          },
                        }}
                        className="h-[300px] w-full"
                      >
                        <RadarChart data={interviewScoreCategories}>
                          <PolarGrid className="stroke-muted" strokeDasharray="3 3" />
                          <PolarAngleAxis
                            dataKey="category"
                            className="text-xs font-medium"
                            tick={{ fill: "hsl(var(--foreground))" }}
                          />
                          <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            className="text-xs"
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                          />
                          <Radar
                            name="Score"
                            dataKey="score"
                            stroke="var(--color-score)"
                            fill="var(--color-score)"
                            fillOpacity={0.5}
                            strokeWidth={2}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RadarChart>
                      </ChartContainer>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Interview Completion Trend */}
              <FadeIn delay={0.25}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Interview Completion Trend
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Weekly interview completions
                    </p>
                  </CardHeader>
                  <CardContent>
                      <ChartContainer
                        config={{
                          interviews: {
                            label: "Interviews",
                            color: "#06b6d4",
                          },
                        }}
                        className="h-[300px] w-full"
                      >
                        <AreaChart data={interviewCompletionTrend}>
                          <defs>
                            <linearGradient id="fillInterviews" x1="0" y1="0" x2="0" y2="1">
                              <stop
                                offset="5%"
                                stopColor="var(--color-interviews)"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="var(--color-interviews)"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="week"
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
                            content={<ChartTooltipContent />}
                          />
                          <Area
                            type="monotone"
                            dataKey="interviews"
                            stroke="var(--color-interviews)"
                            strokeWidth={2}
                            fill="url(#fillInterviews)"
                            name="Interviews"
                          />
                        </AreaChart>
                      </ChartContainer>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            {/* Interview Type Scores & Common Feedback */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
              <FadeIn delay={0.3}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Score by Interview Type
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Average performance across different interview formats
                    </p>
                  </CardHeader>
                  <CardContent>
                      <ChartContainer
                        config={{
                          avgScore: {
                            label: "Avg Score",
                            color: "#10b981",
                          },
                        }}
                        className="h-[300px] w-full"
                      >
                        <BarChart data={interviewTypeScores}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="type"
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
                            domain={[0, 10]}
                          />
                          <ChartTooltip
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                            content={<ChartTooltipContent />}
                          />
                          <Bar
                            dataKey="avgScore"
                            fill="var(--color-avgScore)"
                            radius={[6, 6, 0, 0]}
                            name="Avg Score"
                          />
                        </BarChart>
                      </ChartContainer>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.35}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Common Feedback Areas
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Most frequent improvement suggestions
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {commonFeedbackAreas.map((feedback, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                        >
                          <div className="p-1.5 rounded-md bg-primary/10 shrink-0">
                            <AlertCircle className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-sm flex-1">{feedback}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </TabsContent>

          {/* LinkedIn Tab */}
          <TabsContent value="linkedin" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">LinkedIn Analytics</h2>
              <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select cohort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cohorts</SelectItem>
                  <SelectItem value="cs-2025">CS 2025</SelectItem>
                  <SelectItem value="business-2025">Business 2025</SelectItem>
                  <SelectItem value="design-2025">Design 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Top Metrics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              <AnimatedCard delay={0}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Profiles Uploaded
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {linkedinMetricsByCohort[selectedCohort].uploaded.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">analyzed</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-blue-500/10">
                        <Linkedin className="h-4.5 w-4.5 text-blue-600 dark:text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.05}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          AI Optimized
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {linkedinMetricsByCohort[selectedCohort].optimized.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">profiles enhanced</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/10">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.1}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Avg Profile Score
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {linkedinMetricsByCohort[selectedCohort].avgScore}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">out of 100</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-violet-500/10">
                        <TrendingUp className="h-4.5 w-4.5 text-violet-600 dark:text-violet-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.15}>
                <Card className="rounded-xl shadow-sm py-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          High Scorers
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">
                            {linkedinMetricsByCohort[selectedCohort].highScorers}%
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">scoring 80+</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-500/10">
                        <Award className="h-4.5 w-4.5 text-amber-600 dark:text-amber-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>

            {/* Detailed Insights */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
              {/* Profile Score Distribution */}
              <FadeIn delay={0.2}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Profile Score Distribution
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      LinkedIn profile scores across all students
                    </p>
                  </CardHeader>
                  <CardContent>
                      <ChartContainer
                        config={{
                          count: {
                            label: "Profiles",
                            color: "#0ea5e9",
                          },
                        }}
                        className="h-[300px] w-full"
                      >
                        <BarChart data={linkedinScoreDistribution}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="range"
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
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                            content={<ChartTooltipContent />}
                          />
                          <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={[6, 6, 0, 0]}
                            name="Profiles"
                          />
                        </BarChart>
                      </ChartContainer>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Section Completeness */}
              <FadeIn delay={0.25}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Section Completeness
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Profile section completion rates
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {sectionCompleteness.map((section) => (
                        <div key={section.section} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div 
                                className="h-3 w-3 rounded-full" 
                                style={{ backgroundColor: section.color }}
                              />
                              <span className="font-medium">{section.section}</span>
                            </div>
                            <span className="text-muted-foreground">
                              {section.completeness}%
                            </span>
                          </div>
                          <Progress 
                            value={section.completeness} 
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            {/* Common Issues & Optimization Impact */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <FadeIn delay={0.3}>
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        Most Common Issues
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Top issues identified in LinkedIn profiles
                      </p>
                    </CardHeader>
                    <CardContent>
              <ChartContainer 
                config={{
                  count: {
                    label: "Issues Found",
                            color: "#8b5cf6",
                  },
                }} 
                        className="h-[300px] w-full"
              >
                <BarChart 
                          data={linkedinCommonIssues}
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
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="var(--color-count)"
                            radius={[0, 6, 6, 0]}
                    name="Issues Found"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </FadeIn>
              </div>

              <div className="xl:col-span-4">
                <FadeIn delay={0.35}>
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        Optimization Impact
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Score improvement after AI optimization
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Before</p>
                          <p className="text-2xl font-bold">54.2</p>
                        </div>

                        <div className="flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-emerald-600" />
                        </div>

                        <div className="p-4 rounded-lg border bg-emerald-500/10 border-emerald-500/20">
                          <p className="text-xs text-muted-foreground mb-1">After</p>
                          <p className="text-2xl font-bold text-emerald-600">68.5</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Improvement</span>
                          <span className="text-lg font-bold text-emerald-600">
                            +14.3 pts
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Average score increase
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
