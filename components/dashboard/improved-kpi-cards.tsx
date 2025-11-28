"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Users, FileText, Video, UserRound, ArrowRight } from "lucide-react";

// Compact Progress Bar Component
interface ProgressBarProps {
  value: number;
  color: string;
}

function ProgressBar({ value, color }: ProgressBarProps) {
  return (
    <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

// Card 1: Student Signups
export function SignupKpiCard() {
  const totalSignups = 248;
  const invited = 302;
  const weeklyNew = 52;
  const completionRate = Math.round((totalSignups / invited) * 100);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/analytics?tab=students">
            <Card className="py-0 w-full cursor-pointer group hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-blue-500/10">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Student Signups</p>
                      <p className="text-[10px] text-muted-foreground">+{weeklyNew} this week</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    View Analytics
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="flex items-end justify-between mt-3 mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold tracking-tight">{totalSignups}</span>
                    <span className="text-xs text-muted-foreground">/ {invited}</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {completionRate}% onboarded
                  </span>
                </div>

                <ProgressBar value={completionRate} color="hsl(217, 91%, 60%)" />
              </div>
            </Card>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-4 w-[280px] bg-popover text-popover-foreground border shadow-lg">
          <p className="font-semibold text-sm border-b border-border pb-2 mb-3">Onboarding Progress</p>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Invited</span>
              <span className="font-semibold text-foreground">{invited} students</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Signed up</span>
              <span className="font-semibold text-foreground">{totalSignups} students</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Pending</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">{invited - totalSignups} students</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">This week</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{weeklyNew} new</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ 18%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Card 2: Resume Created
export function ResumeKpiCard() {
  const created = 1860;
  const downloaded = 1240;
  const avgScore = 71;
  const downloadRate = Math.round((downloaded / created) * 100);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/analytics?tab=resumes">
            <Card className="py-0 w-full cursor-pointer group hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-emerald-500/10">
                      <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Resumes </p>
                      <p className="text-[10px] text-muted-foreground">Avg score: {avgScore}/100</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    View Analytics
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="flex items-end justify-between mt-3 mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold tracking-tight">{downloaded.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">/ {created.toLocaleString()}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {downloadRate}% downloaded
                  </span>
                </div>

                <ProgressBar value={downloadRate} color="hsl(142, 76%, 36%)" />
              </div>
            </Card>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-4 w-[280px] bg-popover text-popover-foreground border shadow-lg">
          <p className="font-semibold text-sm border-b border-border pb-2 mb-3">Resume Funnel</p>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Created</span>
              <span className="font-semibold text-foreground">{created.toLocaleString()} resumes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Downloaded</span>
              <span className="font-semibold text-foreground">{downloaded.toLocaleString()} resumes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Not downloaded</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">{(created - downloaded).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Avg quality</span>
              <span className="font-semibold text-foreground">{avgScore}/100</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ 22%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Card 3: Interview Practice
export function InterviewKpiCard() {
  const started = 342;
  const reportsViewed = 298;
  const lowScoreCount = 78;
  const followThrough = Math.round((reportsViewed / started) * 100);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/analytics?tab=interviews">
            <Card className="py-0 w-full cursor-pointer group hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-purple-500/10">
                      <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Interviews</p>
                      <p className="text-[10px] text-muted-foreground">{lowScoreCount} need attention</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    View Analytics
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="flex items-end justify-between mt-3 mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold tracking-tight">{reportsViewed}</span>
                    <span className="text-xs text-muted-foreground">/ {started}</span>
                  </div>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    {followThrough}% reviewed
                  </span>
                </div>

                <ProgressBar value={followThrough} color="hsl(271, 91%, 65%)" />
              </div>
            </Card>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-4 w-[280px] bg-popover text-popover-foreground border shadow-lg">
          <p className="font-semibold text-sm border-b border-border pb-2 mb-3">Interview Practice</p>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sessions</span>
              <span className="font-semibold text-foreground">{started} completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Reviewed</span>
              <span className="font-semibold text-foreground">{reportsViewed} reports</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Skipped review</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">{started - reportsViewed} students</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Need coaching</span>
              <span className="font-semibold text-red-600 dark:text-red-400">{lowScoreCount} students</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ 15%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Card 4: LinkedIn Profiles
export function LinkedInKpiCard() {
  const uploads = 782;
  const optimized = 493;
  const avgScore = 76;
  const adoptionRate = 63;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/analytics?tab=linkedin">
            <Card className="py-0 w-full cursor-pointer group hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-orange-500/10">
                      <UserRound className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">LinkedIn Profiles</p>
                      <p className="text-[10px] text-muted-foreground">Avg score: {avgScore}/100</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    View Analytics
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="flex items-end justify-between mt-3 mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold tracking-tight">{optimized}</span>
                    <span className="text-xs text-muted-foreground">/ {uploads}</span>
                  </div>
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                    {adoptionRate}% optimized
                  </span>
                </div>

                <ProgressBar value={adoptionRate} color="hsl(24, 95%, 53%)" />
              </div>
            </Card>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-4 w-[280px] bg-popover text-popover-foreground border shadow-lg">
          <p className="font-semibold text-sm border-b border-border pb-2 mb-3">LinkedIn Profiles</p>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Uploaded</span>
              <span className="font-semibold text-foreground">{uploads} profiles</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">AI optimized</span>
              <span className="font-semibold text-foreground">{optimized} profiles</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Not optimized</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">{uploads - optimized} profiles</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Avg quality</span>
              <span className="font-semibold text-foreground">{avgScore}/100</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ 12%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Wrapper Component
export function PrimaryKpisRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <SignupKpiCard />
      <ResumeKpiCard />
      <InterviewKpiCard />
      <LinkedInKpiCard />
    </div>
  );
}
