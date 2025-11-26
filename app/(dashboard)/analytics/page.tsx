"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/motion/animated-card";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHeader } from "@/components/page-header";
import { ThemeSelector } from "@/components/theme-selector";
import { StyleSelector } from "@/components/style-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "recharts";
import {
  Users,
  Zap,
  Inbox,
  TrendingUp,
  Mail,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const chartConfig = {
  total: {
    label: "Resumes Processed",
    color: "#10b981",
  },
};

// Student Progress Stats
const studentProgressStats = [
  {
    title: "Average Resume Score",
    value: "72.4",
    subtitle: "Out of 100",
    icon: FileText,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-500",
  },
  {
    title: "Avg. Improvement / Student",
    value: "+18.2",
    subtitle: "Points gained",
    icon: TrendingUp,
    iconBg: "bg-emerald-500/10", 
    iconColor: "text-emerald-600 dark:text-emerald-500",
  },
  {
    title: "Students at Target Score",
    value: "64%",
    subtitle: "Score ≥ 80",
    icon: CheckCircle2,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-500",
  },
];

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
  },
  {
    title: "AI-Optimized Resumes",
    value: "3,850",
    subtitle: "ATS checks passed",
    icon: Zap,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-500",
  },
  {
    title: "Pending Reviews",
    value: "14",
    subtitle: "Requires feedback",
    icon: Inbox,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-500",
  },
  {
    title: "Avg. Interview Confidence",
    value: "8.4/10",
    subtitle: "Student self-reported",
    icon: TrendingUp,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-500",
  },
];

export default function AnalyticsPage() {
  const [selectedCohort, setSelectedCohort] = useState("cs-2025");

  return (
    <div className="flex flex-col w-full min-h-screen">
      <PageHeader
        title="Analytics"
        description="Comprehensive insights into student progress and performance metrics."
        actions={
          <div className="flex items-center gap-2">
            <StyleSelector />
            <ThemeSelector />
          </div>
        }
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden p-4 md:p-6 xl:p-8 space-y-6">
        {/* Impact Stats Row */}
        <div className="space-y-3 max-w-full">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Impact Overview
          </h2>
          <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 max-w-full">
            {impactStats.map((stat, index) => (
              <AnimatedCard key={stat.title} delay={index * 0.05}>
                <Card className="rounded-xl shadow-sm py-0 transition-all duration-200 hover:shadow-md">
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
                      <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                        <stat.icon className={`h-4.5 w-4.5 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Student Progress Stats */}
        <div className="space-y-3 max-w-full">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Student Progress
          </h2>
          <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-3 max-w-full">
            {studentProgressStats.map((stat, index) => (
              <AnimatedCard key={stat.title} delay={index * 0.05}>
                <Card className="rounded-xl shadow-sm py-0 transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                        </div>
                        {stat.subtitle && (
                          <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                        )}
                      </div>
                      <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                        <stat.icon className={`h-4.5 w-4.5 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
      </main>
    </div>
  );
}

