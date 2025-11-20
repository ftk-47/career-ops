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
  AlertCircle,
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

        {/* Alert Section - Overdue Reviews */}
        {/* <FadeIn delay={0.3} direction="up"> */}
        {/* <Card className="border-l-4 border-l-warning bg-warning/5 rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <CardTitle className="text-base font-medium">Attention Needed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have <span className="font-semibold text-foreground">5 overdue reviews</span> that require immediate attention.{" "}
              <button
                onClick={() => router.push("/review-center")}
                className="text-primary hover:underline font-medium"
              >
                View all →
              </button>
            </p>
          </CardContent>
        </Card> */}
        {/* </FadeIn> */}

        {/* Quick Actions */}
        <FadeIn delay={0.35} direction="up">
          <QuickActions actions={quickActions} />
        </FadeIn>

        {/* Recent Activity */}
        <FadeIn delay={0.4} direction="up">
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
