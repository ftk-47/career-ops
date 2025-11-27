"use client";

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
          <Card className="py-0 w-full rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-card/80 backdrop-blur-sm cursor-pointer group">
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
                <span className="text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View invites
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
              
              <div className="flex items-end justify-between mt-3 mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight">{totalSignups}</span>
                  <span className="text-xs text-muted-foreground">/ {invited}</span>
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                  {completionRate}% onboarded
                </span>
              </div>
              
              <ProgressBar value={completionRate} color="hsl(217, 91%, 60%)" />
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{totalSignups} of {invited} invited students completed onboarding</p>
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
          <Card className="py-0 w-full rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-card/80 backdrop-blur-sm cursor-pointer group">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-emerald-500/10">
                    <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Resumes Created</p>
                    <p className="text-[10px] text-muted-foreground">Avg score: {avgScore}/100</p>
                  </div>
                </div>
                <span className="text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View resumes
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
              
              <div className="flex items-end justify-between mt-3 mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight">{downloaded.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">/ {created.toLocaleString()}</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  {downloadRate}% downloaded
                </span>
              </div>
              
              <ProgressBar value={downloadRate} color="hsl(142, 76%, 36%)" />
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{downloaded.toLocaleString()} of {created.toLocaleString()} resumes downloaded</p>
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
          <Card className="py-0 w-full rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-card/80 backdrop-blur-sm cursor-pointer group">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-purple-500/10">
                    <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Mock Interviews</p>
                    <p className="text-[10px] text-muted-foreground">{lowScoreCount} need attention</p>
                  </div>
                </div>
                <span className="text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View interviews
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
              
              <div className="flex items-end justify-between mt-3 mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight">{reportsViewed}</span>
                  <span className="text-xs text-muted-foreground">/ {started}</span>
                </div>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-0.5">
                  {followThrough}% reviewed
                </span>
              </div>
              
              <ProgressBar value={followThrough} color="hsl(271, 91%, 65%)" />
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{reportsViewed} of {started} reviewed their feedback reports</p>
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
          <Card className="py-0 w-full rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-card/80 backdrop-blur-sm cursor-pointer group">
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
                <span className="text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View profiles
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
              
              <div className="flex items-end justify-between mt-3 mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight">{optimized}</span>
                  <span className="text-xs text-muted-foreground">/ {uploads}</span>
                </div>
                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-0.5">
                  {adoptionRate}% optimized
                </span>
              </div>
              
              <ProgressBar value={adoptionRate} color="hsl(24, 95%, 53%)" />
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{optimized} of {uploads} profiles AI-optimized</p>
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

