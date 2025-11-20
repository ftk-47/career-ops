"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/metric-card";
import { QuickActions } from "@/components/quick-actions";
import { PageHeader } from "@/components/page-header";
import { ThemeSelector } from "@/components/theme-selector";
import { StyleSelector } from "@/components/style-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCard } from "@/components/motion/animated-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Users,
  GraduationCap,
  UserCheck,
  Calendar,
  UserPlus,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

const recentActivity = [
  { id: "1", student: "Alice Johnson", type: "Resume", status: "Pending", time: "2 hours ago" },
  { id: "2", student: "Bob Smith", type: "Cover Letter", status: "In Review", time: "3 hours ago" },
  { id: "3", student: "Carol Williams", type: "Interview", status: "Completed", time: "5 hours ago" },
  { id: "4", student: "David Brown", type: "Resume", status: "Pending", time: "6 hours ago" },
  { id: "5", student: "Emma Davis", type: "Resume", status: "Rejected", time: "8 hours ago" },
  { id: "6", student: "Frank Miller", type: "Cover Letter", status: "In Review", time: "1 day ago" },
  { id: "7", student: "Grace Wilson", type: "Interview", status: "Completed", time: "1 day ago" },
  { id: "8", student: "Henry Moore", type: "Resume", status: "Pending", time: "2 days ago" },
];

const statusVariants: Record<string, "success" | "warning" | "error" | "info"> = {
  Pending: "warning",
  "In Review": "info",
  Completed: "success",
  Rejected: "error",
};

// Mock data for charts
const submissionsOverTime = [
  { date: "Nov 1", submissions: 8 },
  { date: "Nov 2", submissions: 12 },
  { date: "Nov 3", submissions: 6 },
  { date: "Nov 4", submissions: 15 },
  { date: "Nov 5", submissions: 10 },
  { date: "Nov 6", submissions: 14 },
  { date: "Nov 7", submissions: 9 },
  { date: "Nov 8", submissions: 18 },
  { date: "Nov 9", submissions: 11 },
  { date: "Nov 10", submissions: 13 },
  { date: "Nov 11", submissions: 7 },
  { date: "Nov 12", submissions: 16 },
  { date: "Nov 13", submissions: 12 },
  { date: "Nov 14", submissions: 19 },
  { date: "Nov 15", submissions: 14 },
  { date: "Nov 16", submissions: 10 },
  { date: "Nov 17", submissions: 15 },
  { date: "Nov 18", submissions: 17 },
  { date: "Nov 19", submissions: 13 },
  { date: "Nov 20", submissions: 20 },
];

const statusDistribution = [
  { status: "Pending", count: 42, fill: "var(--chart-1)" },
  { status: "In Review", count: 28, fill: "var(--chart-2)" },
  { status: "Completed", count: 186, fill: "var(--chart-3)" },
  { status: "Rejected", count: 28, fill: "var(--chart-4)" },
];

const statusColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

const submissionTypes = [
  { type: "Resume", count: 158 },
  { type: "Cover Letter", count: 84 },
  { type: "Interview", count: 42 },
];

const submissionTypeColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
];

const chartConfig = {
  submissions: {
    label: "Submissions",
    color: "var(--chart-1)",
  },
  Pending: {
    label: "Pending",
    color: "var(--chart-1)",
  },
  "In Review": {
    label: "In Review",
    color: "var(--chart-2)",
  },
  Completed: {
    label: "Completed",
    color: "var(--chart-3)",
  },
  Rejected: {
    label: "Rejected",
    color: "var(--chart-4)",
  },
  Resume: {
    label: "Resume",
    color: "var(--chart-1)",
  },
  "Cover Letter": {
    label: "Cover Letter",
    color: "var(--chart-2)",
  },
  Interview: {
    label: "Interview",
    color: "var(--chart-3)",
  },
};

export default function Dashboard() {
  const router = useRouter();
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  const [createCohortOpen, setCreateCohortOpen] = useState(false);
  const [createInterviewOpen, setCreateInterviewOpen] = useState(false);

  const stats = [
    {
      title: "Total Submissions",
      value: "284",
      description: "All time submissions",
      icon: FileText,
      trend: { value: 12.5, label: "from last month" },
      onClick: () => router.push("/student-submissions"),
    },
    {
      title: "Pending Reviews",
      value: "42",
      description: "Awaiting review",
      icon: UserCheck,
      trend: { value: -8.2, label: "from last week" },
      onClick: () => router.push("/review-center"),
    },
    {
      title: "Active Cohorts",
      value: "12",
      description: "Currently active",
      icon: GraduationCap,
      onClick: () => router.push("/manage-cohorts"),
    },
    {
      title: "Team Members",
      value: "18",
      description: "Active reviewers",
      icon: Users,
      onClick: () => router.push("/manage-team"),
    },
    {
      title: "Interviews Assigned",
      value: "8",
      description: "Due today",
      icon: Calendar,
      onClick: () => router.push("/manage-interviews"),
    },
  ];

  const quickActions = [
    {
      label: "Invite Member",
      description: "Add a new team member",
      icon: UserPlus,
      onClick: () => setInviteSheetOpen(true),
    },
    {
      label: "Create Cohort",
      description: "Start a new student cohort",
      icon: GraduationCap,
      onClick: () => setCreateCohortOpen(true),
    },
    {
      label: "Create Interview",
      description: "Set up interview template",
      icon: Calendar,
      onClick: () => setCreateInterviewOpen(true),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your team."
        actions={
          <div className="flex items-center gap-2">
            <StyleSelector />
            <ThemeSelector />
          </div>
        }
      />
      <main className="flex-1 p-6 space-y-6 w-full">
        {/* Quick Stats Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quick Stats</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <AnimatedCard key={stat.title} delay={index * 0.05}>
                <MetricCard {...stat} />
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <FadeIn delay={0.25} direction="up">
          <QuickActions actions={quickActions} />
        </FadeIn>

        {/* Charts Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Analytics</h2>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {/* Submissions Over Time Chart */}
            <FadeIn delay={0.3} direction="up">
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Submissions Over Time
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">Daily submission trends for the last 20 days</p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <AreaChart data={submissionsOverTime}>
                      <defs>
                        <linearGradient id="fillSubmissions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(4)}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Area
                        type="monotone"
                        dataKey="submissions"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        fill="url(#fillSubmissions)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Status Distribution Chart */}
            <FadeIn delay={0.35} direction="up">
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Status Distribution</CardTitle>
                  <p className="text-xs text-muted-foreground">Breakdown of submission statuses</p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={statusDistribution}
                        dataKey="count"
                        nameKey="status"
                        innerRadius={60}
                        outerRadius={90}
                        strokeWidth={5}
                        stroke="var(--background)"
                        labelLine={false}
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={statusColors[index]} />
                        ))}
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              const total = statusDistribution.reduce((acc, curr) => acc + curr.count, 0);
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {total}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground text-xs"
                                  >
                                    Total
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </Pie>
                      <ChartLegend
                        content={<ChartLegendContent nameKey="status" />}
                        verticalAlign="bottom"
                        className="mt-4"
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Submission Types Chart */}
            <FadeIn delay={0.4} direction="up">
              <Card className="rounded-xl shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Submission Types</CardTitle>
                  <p className="text-xs text-muted-foreground">Distribution by submission type</p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <BarChart data={submissionTypes}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="type"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar
                        dataKey="count"
                        radius={[8, 8, 0, 0]}
                      >
                        {submissionTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={submissionTypeColors[index]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>

        {/* Recent Activity */}
        <FadeIn delay={0.5} direction="up">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <StaggerContainer as="tbody" delay={0.5} staggerDelay={0.03}>
                  {recentActivity.map((activity) => (
                    <StaggerItem key={activity.id} as="tr" className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <TableCell className="font-medium">{activity.student}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {activity.type}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[activity.status]}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {activity.time}
                      </TableCell>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </Table>
        </div>
          </CardContent>
        </Card>
        </FadeIn>
      </main>

      {/* Modals/Sheets */}
      <Sheet open={inviteSheetOpen} onOpenChange={setInviteSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Invite Team Member</SheetTitle>
            <SheetDescription>
              This feature is coming soon. You&apos;ll be able to invite new team members to join your organization.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Dialog open={createCohortOpen} onOpenChange={setCreateCohortOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Cohort</DialogTitle>
            <DialogDescription>
              This feature is coming soon. You&apos;ll be able to create new cohorts and assign students and reviewers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={createInterviewOpen} onOpenChange={setCreateInterviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Interview</DialogTitle>
            <DialogDescription>
              This feature is coming soon. You&apos;ll be able to create and assign interview templates to students.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
