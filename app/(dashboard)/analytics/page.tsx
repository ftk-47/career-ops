"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { format, subDays, subMonths, startOfYear } from "date-fns";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Date filter types
type DatePreset = "7d" | "30d" | "3m" | "6m" | "1y" | "custom";
type DateRange = { from: Date; to: Date };

// Date multipliers for mock data variation
const dateMultipliers: Record<DatePreset, number> = {
  "7d": 0.25,
  "30d": 1,
  "3m": 2.8,
  "6m": 5.5,
  "1y": 10,
  "custom": 1,
};

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

const signupTrendDataByCohort: Record<string, Array<{ month: string; signups: number }>> = {
  "all": [
    { month: "Jun", signups: 145 },
    { month: "Jul", signups: 178 },
    { month: "Aug", signups: 210 },
    { month: "Sep", signups: 195 },
    { month: "Oct", signups: 234 },
    { month: "Nov", signups: 278 },
  ],
  "cs-2025": [
    { month: "Jun", signups: 48 },
    { month: "Jul", signups: 62 },
    { month: "Aug", signups: 71 },
    { month: "Sep", signups: 65 },
    { month: "Oct", signups: 82 },
    { month: "Nov", signups: 92 },
  ],
  "business-2025": [
    { month: "Jun", signups: 42 },
    { month: "Jul", signups: 55 },
    { month: "Aug", signups: 68 },
    { month: "Sep", signups: 61 },
    { month: "Oct", signups: 74 },
    { month: "Nov", signups: 85 },
  ],
  "design-2025": [
    { month: "Jun", signups: 55 },
    { month: "Jul", signups: 61 },
    { month: "Aug", signups: 71 },
    { month: "Sep", signups: 69 },
    { month: "Oct", signups: 78 },
    { month: "Nov", signups: 101 },
  ],
};

const cohortDistributionData = [
  { name: "CS 2025", value: 420, fill: "#10b981" },
  { name: "Business 2025", value: 385, fill: "#3b82f6" },
  { name: "Design 2025", value: 435, fill: "#8b5cf6" },
];

const activityFunnelDataByCohort: Record<string, Array<{ stage: string; count: number; percentage: number; color: string }>> = {
  "all": [
    { stage: "Invited", count: 1485, percentage: 100, color: "#10b981" },
    { stage: "Signed Up", count: 1240, percentage: 84, color: "#3b82f6" },
    { stage: "Active (7d)", count: 967, percentage: 78, color: "#8b5cf6" },
    { stage: "Profile Complete", count: 856, percentage: 69, color: "#ec4899" },
  ],
  "cs-2025": [
    { stage: "Invited", count: 512, percentage: 100, color: "#10b981" },
    { stage: "Signed Up", count: 420, percentage: 82, color: "#3b82f6" },
    { stage: "Active (7d)", count: 344, percentage: 82, color: "#8b5cf6" },
    { stage: "Profile Complete", count: 302, percentage: 72, color: "#ec4899" },
  ],
  "business-2025": [
    { stage: "Invited", count: 468, percentage: 100, color: "#10b981" },
    { stage: "Signed Up", count: 385, percentage: 82, color: "#3b82f6" },
    { stage: "Active (7d)", count: 289, percentage: 75, color: "#8b5cf6" },
    { stage: "Profile Complete", count: 254, percentage: 66, color: "#ec4899" },
  ],
  "design-2025": [
    { stage: "Invited", count: 505, percentage: 100, color: "#10b981" },
    { stage: "Signed Up", count: 435, percentage: 86, color: "#3b82f6" },
    { stage: "Active (7d)", count: 335, percentage: 77, color: "#8b5cf6" },
    { stage: "Profile Complete", count: 300, percentage: 69, color: "#ec4899" },
  ],
};

const studentsNeedingAttentionByCohort: Record<string, Array<{ id: number; name: string; major: string; issue: string; daysInactive: number; initials: string }>> = {
  "all": [
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
  ],
  "cs-2025": [
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
      name: "David Kim",
      major: "Computer Science",
      issue: "No Interview Practice",
      daysInactive: 8,
      initials: "DK",
    },
    {
      id: 3,
      name: "Emily Zhang",
      major: "Computer Engineering",
      issue: "Profile Incomplete",
      daysInactive: 15,
      initials: "EZ",
    },
  ],
  "business-2025": [
    {
      id: 1,
      name: "Sarah Jenkins",
      major: "Marketing",
      issue: "No Interview Practice",
      daysInactive: 5,
      initials: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      major: "Finance",
      issue: "Profile Incomplete",
      daysInactive: 20,
      initials: "MC",
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      major: "Business Analytics",
      issue: "Resume Score < 40",
      daysInactive: 11,
      initials: "LR",
    },
  ],
  "design-2025": [
    {
      id: 1,
      name: "Jessica Wu",
      major: "Design",
      issue: "Resume Score Stagnant",
      daysInactive: 8,
      initials: "JW",
    },
    {
      id: 2,
      name: "Ryan Martinez",
      major: "UX Design",
      issue: "No Interview Practice",
      daysInactive: 6,
      initials: "RM",
    },
    {
      id: 3,
      name: "Sophie Taylor",
      major: "Graphic Design",
      issue: "Profile Incomplete",
      daysInactive: 14,
      initials: "ST",
    },
  ],
};

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

const scoreDistributionDataByCohort: Record<string, Array<{ range: string; count: number }>> = {
  "all": [
    { range: "0-20", count: 45 },
    { range: "21-40", count: 128 },
    { range: "41-60", count: 342 },
    { range: "61-80", count: 876 },
    { range: "81-100", count: 459 },
  ],
  "cs-2025": [
    { range: "0-20", count: 12 },
    { range: "21-40", count: 38 },
    { range: "41-60", count: 102 },
    { range: "61-80", count: 312 },
    { range: "81-100", count: 176 },
  ],
  "business-2025": [
    { range: "0-20", count: 16 },
    { range: "21-40", count: 45 },
    { range: "41-60", count: 118 },
    { range: "61-80", count: 278 },
    { range: "81-100", count: 143 },
  ],
  "design-2025": [
    { range: "0-20", count: 17 },
    { range: "21-40", count: 45 },
    { range: "41-60", count: 122 },
    { range: "61-80", count: 286 },
    { range: "81-100", count: 140 },
  ],
};

const resumeScoreTrendDataByCohort: Record<string, Array<{ week: string; score: number }>> = {
  "all": [
    { week: "Week 1", score: 68.2 },
    { week: "Week 2", score: 69.5 },
    { week: "Week 3", score: 70.1 },
    { week: "Week 4", score: 71.3 },
    { week: "Week 5", score: 71.8 },
    { week: "Week 6", score: 72.4 },
  ],
  "cs-2025": [
    { week: "Week 1", score: 70.1 },
    { week: "Week 2", score: 71.2 },
    { week: "Week 3", score: 72.0 },
    { week: "Week 4", score: 73.1 },
    { week: "Week 5", score: 73.7 },
    { week: "Week 6", score: 74.2 },
  ],
  "business-2025": [
    { week: "Week 1", score: 67.5 },
    { week: "Week 2", score: 68.8 },
    { week: "Week 3", score: 69.6 },
    { week: "Week 4", score: 70.5 },
    { week: "Week 5", score: 71.2 },
    { week: "Week 6", score: 71.8 },
  ],
  "design-2025": [
    { week: "Week 1", score: 67.0 },
    { week: "Week 2", score: 68.3 },
    { week: "Week 3", score: 69.1 },
    { week: "Week 4", score: 70.0 },
    { week: "Week 5", score: 70.7 },
    { week: "Week 6", score: 71.2 },
  ],
};

const commonIssuesDataByCohort: Record<string, Array<{ issue: string; count: number }>> = {
  "all": [
    { issue: "Weak Action Verbs", count: 456 },
    { issue: "Missing Metrics", count: 398 },
    { issue: "Poor Formatting", count: 367 },
    { issue: "Typos & Grammar", count: 312 },
    { issue: "Vague Descriptions", count: 289 },
    { issue: "Inconsistent Dates", count: 245 },
    { issue: "Missing Keywords", count: 198 },
    { issue: "Too Lengthy", count: 167 },
  ],
  "cs-2025": [
    { issue: "Missing Metrics", count: 145 },
    { issue: "Weak Action Verbs", count: 132 },
    { issue: "Vague Descriptions", count: 98 },
    { issue: "Poor Formatting", count: 87 },
    { issue: "Typos & Grammar", count: 76 },
    { issue: "Missing Keywords", count: 71 },
    { issue: "Inconsistent Dates", count: 65 },
    { issue: "Too Lengthy", count: 48 },
  ],
  "business-2025": [
    { issue: "Weak Action Verbs", count: 156 },
    { issue: "Missing Metrics", count: 142 },
    { issue: "Poor Formatting", count: 124 },
    { issue: "Typos & Grammar", count: 118 },
    { issue: "Vague Descriptions", count: 95 },
    { issue: "Missing Keywords", count: 72 },
    { issue: "Inconsistent Dates", count: 89 },
    { issue: "Too Lengthy", count: 62 },
  ],
  "design-2025": [
    { issue: "Weak Action Verbs", count: 168 },
    { issue: "Poor Formatting", count: 156 },
    { issue: "Missing Metrics", count: 111 },
    { issue: "Typos & Grammar", count: 118 },
    { issue: "Vague Descriptions", count: 96 },
    { issue: "Inconsistent Dates", count: 91 },
    { issue: "Too Lengthy", count: 57 },
    { issue: "Missing Keywords", count: 55 },
  ],
};

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

const interviewScoreCategoriesByCohort: Record<string, Array<{ category: string; score: number }>> = {
  "all": [
    { category: "Posture", score: 82 },
    { category: "Speech", score: 76 },
    { category: "Answer Quality", score: 78 },
    { category: "Confidence", score: 74 },
    { category: "Eye Contact", score: 80 },
  ],
  "cs-2025": [
    { category: "Posture", score: 84 },
    { category: "Speech", score: 79 },
    { category: "Answer Quality", score: 81 },
    { category: "Confidence", score: 77 },
    { category: "Eye Contact", score: 82 },
  ],
  "business-2025": [
    { category: "Posture", score: 81 },
    { category: "Speech", score: 75 },
    { category: "Answer Quality", score: 77 },
    { category: "Confidence", score: 73 },
    { category: "Eye Contact", score: 79 },
  ],
  "design-2025": [
    { category: "Posture", score: 80 },
    { category: "Speech", score: 74 },
    { category: "Answer Quality", score: 76 },
    { category: "Confidence", score: 72 },
    { category: "Eye Contact", score: 78 },
  ],
};

const interviewCompletionTrendByCohort: Record<string, Array<{ week: string; interviews: number }>> = {
  "all": [
    { week: "Week 1", interviews: 118 },
    { week: "Week 2", interviews: 134 },
    { week: "Week 3", interviews: 142 },
    { week: "Week 4", interviews: 156 },
    { week: "Week 5", interviews: 168 },
    { week: "Week 6", interviews: 174 },
  ],
  "cs-2025": [
    { week: "Week 1", interviews: 42 },
    { week: "Week 2", interviews: 48 },
    { week: "Week 3", interviews: 51 },
    { week: "Week 4", interviews: 56 },
    { week: "Week 5", interviews: 59 },
    { week: "Week 6", interviews: 59 },
  ],
  "business-2025": [
    { week: "Week 1", interviews: 38 },
    { week: "Week 2", interviews: 44 },
    { week: "Week 3", interviews: 46 },
    { week: "Week 4", interviews: 51 },
    { week: "Week 5", interviews: 54 },
    { week: "Week 6", interviews: 65 },
  ],
  "design-2025": [
    { week: "Week 1", interviews: 38 },
    { week: "Week 2", interviews: 42 },
    { week: "Week 3", interviews: 45 },
    { week: "Week 4", interviews: 49 },
    { week: "Week 5", interviews: 55 },
    { week: "Week 6", interviews: 50 },
  ],
};

const interviewTypeScoresByCohort: Record<string, Array<{ type: string; avgScore: number }>> = {
  "all": [
    { type: "Technical", avgScore: 7.9 },
    { type: "Behavioral", avgScore: 8.1 },
    { type: "Case Study", avgScore: 7.4 },
    { type: "Leadership", avgScore: 7.7 },
  ],
  "cs-2025": [
    { type: "Technical", avgScore: 8.3 },
    { type: "Behavioral", avgScore: 8.2 },
    { type: "Case Study", avgScore: 7.8 },
    { type: "Leadership", avgScore: 7.9 },
  ],
  "business-2025": [
    { type: "Technical", avgScore: 7.6 },
    { type: "Behavioral", avgScore: 8.2 },
    { type: "Case Study", avgScore: 7.5 },
    { type: "Leadership", avgScore: 8.0 },
  ],
  "design-2025": [
    { type: "Technical", avgScore: 7.5 },
    { type: "Behavioral", avgScore: 7.9 },
    { type: "Case Study", avgScore: 7.0 },
    { type: "Leadership", avgScore: 7.3 },
  ],
};

const commonFeedbackAreasByCohort: Record<string, string[]> = {
  "all": [
    "Improve eye contact during responses",
    "Reduce filler words (um, uh, like)",
    "Provide more specific examples",
    "Better structure in STAR format",
    "Speak with more confidence",
  ],
  "cs-2025": [
    "Provide more specific examples",
    "Better structure in STAR format",
    "Improve storytelling in behavioral questions",
    "Reduce technical jargon in explanations",
    "Show more enthusiasm and energy",
  ],
  "business-2025": [
    "Improve eye contact during responses",
    "Reduce filler words (um, uh, like)",
    "Speak with more confidence",
    "Better quantify business impact",
    "Practice active listening cues",
  ],
  "design-2025": [
    "Improve eye contact during responses",
    "Speak with more confidence",
    "Better articulate design decisions",
    "Reduce filler words (um, uh, like)",
    "Practice portfolio presentation flow",
  ],
};

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

const linkedinScoreDistributionByCohort: Record<string, Array<{ range: string; count: number }>> = {
  "all": [
    { range: "0-20", count: 32 },
    { range: "21-40", count: 98 },
    { range: "41-60", count: 287 },
    { range: "61-80", count: 421 },
    { range: "81-100", count: 207 },
  ],
  "cs-2025": [
    { range: "0-20", count: 8 },
    { range: "21-40", count: 28 },
    { range: "41-60", count: 92 },
    { range: "61-80", count: 156 },
    { range: "81-100", count: 78 },
  ],
  "business-2025": [
    { range: "0-20", count: 12 },
    { range: "21-40", count: 35 },
    { range: "41-60", count: 98 },
    { range: "61-80", count: 138 },
    { range: "81-100", count: 65 },
  ],
  "design-2025": [
    { range: "0-20", count: 12 },
    { range: "21-40", count: 35 },
    { range: "41-60", count: 97 },
    { range: "61-80", count: 127 },
    { range: "81-100", count: 64 },
  ],
};

const linkedinCommonIssuesByCohort: Record<string, Array<{ issue: string; count: number }>> = {
  "all": [
    { issue: "Weak Headline", count: 342 },
    { issue: "Missing Summary", count: 298 },
    { issue: "Incomplete Experience", count: 267 },
    { issue: "Few Skills Listed", count: 234 },
    { issue: "No Custom URL", count: 198 },
    { issue: "Missing Keywords", count: 176 },
  ],
  "cs-2025": [
    { issue: "Missing Keywords", count: 89 },
    { issue: "Few Skills Listed", count: 82 },
    { issue: "Weak Headline", count: 76 },
    { issue: "Incomplete Experience", count: 68 },
    { issue: "Missing Summary", count: 61 },
    { issue: "No Custom URL", count: 54 },
  ],
  "business-2025": [
    { issue: "Weak Headline", count: 128 },
    { issue: "Missing Summary", count: 115 },
    { issue: "Incomplete Experience", count: 98 },
    { issue: "Few Skills Listed", count: 76 },
    { issue: "No Custom URL", count: 72 },
    { issue: "Missing Keywords", count: 45 },
  ],
  "design-2025": [
    { issue: "Weak Headline", count: 138 },
    { issue: "Missing Summary", count: 122 },
    { issue: "Incomplete Experience", count: 101 },
    { issue: "Few Skills Listed", count: 76 },
    { issue: "No Custom URL", count: 72 },
    { issue: "Missing Keywords", count: 42 },
  ],
};

const sectionCompletenessByCohort: Record<string, Array<{ section: string; completeness: number; color: string }>> = {
  "all": [
    { section: "Headline", completeness: 85, color: "#10b981" },
    { section: "Summary", completeness: 72, color: "#3b82f6" },
    { section: "Experience", completeness: 78, color: "#8b5cf6" },
    { section: "Skills", completeness: 68, color: "#ec4899" },
    { section: "Education", completeness: 92, color: "#06b6d4" },
  ],
  "cs-2025": [
    { section: "Headline", completeness: 88, color: "#10b981" },
    { section: "Summary", completeness: 76, color: "#3b82f6" },
    { section: "Experience", completeness: 82, color: "#8b5cf6" },
    { section: "Skills", completeness: 74, color: "#ec4899" },
    { section: "Education", completeness: 95, color: "#06b6d4" },
  ],
  "business-2025": [
    { section: "Headline", completeness: 83, color: "#10b981" },
    { section: "Summary", completeness: 69, color: "#3b82f6" },
    { section: "Experience", completeness: 76, color: "#8b5cf6" },
    { section: "Skills", completeness: 65, color: "#ec4899" },
    { section: "Education", completeness: 91, color: "#06b6d4" },
  ],
  "design-2025": [
    { section: "Headline", completeness: 84, color: "#10b981" },
    { section: "Summary", completeness: 71, color: "#3b82f6" },
    { section: "Experience", completeness: 76, color: "#8b5cf6" },
    { section: "Skills", completeness: 66, color: "#ec4899" },
    { section: "Education", completeness: 90, color: "#06b6d4" },
  ],
};

function AnalyticsContent() {
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [datePreset, setDatePreset] = useState<DatePreset>("30d");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const validTabs = ["students", "resumes", "interviews", "linkedin"];
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : "students";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Handle date preset change
  const handleDatePresetChange = (value: DatePreset) => {
    setDatePreset(value);
    const now = new Date();
    switch (value) {
      case "7d":
        setDateRange({ from: subDays(now, 7), to: now });
        break;
      case "30d":
        setDateRange({ from: subDays(now, 30), to: now });
        break;
      case "3m":
        setDateRange({ from: subMonths(now, 3), to: now });
        break;
      case "6m":
        setDateRange({ from: subMonths(now, 6), to: now });
        break;
      case "1y":
        setDateRange({ from: startOfYear(now), to: now });
        break;
    }
  };

  // Get date label for display
  const getDateLabel = () => {
    switch (datePreset) {
      case "7d": return "Last 7 days";
      case "30d": return "Last 30 days";
      case "3m": return "Last 3 months";
      case "6m": return "Last 6 months";
      case "1y": return "This year";
    }
  };

  // Helper to scale metrics based on date range
  const getScaledMetric = (baseValue: number, isCount: boolean = true) => {
    const multiplier = dateMultipliers[datePreset];
    if (isCount) {
      return Math.round(baseValue * multiplier);
    }
    // For percentages/scores, apply smaller variation
    const variance = (multiplier - 1) * 0.05;
    return Math.round((baseValue * (1 + variance)) * 10) / 10;
  };

  // Get student metrics based on cohort and date
  const currentStudentMetrics = {
    total: getScaledMetric(studentMetricsByCohort[selectedCohort].total),
    trend: datePreset === "7d" ? "+5%" : datePreset === "3m" ? "+18%" : datePreset === "6m" ? "+32%" : datePreset === "1y" ? "+45%" : studentMetricsByCohort[selectedCohort].trend,
    newSignups: getScaledMetric(studentMetricsByCohort[selectedCohort].newSignups),
    signupsTrend: datePreset === "7d" ? "+8%" : datePreset === "3m" ? "+35%" : datePreset === "6m" ? "+52%" : datePreset === "1y" ? "+78%" : studentMetricsByCohort[selectedCohort].signupsTrend,
    pendingInvites: Math.round(studentMetricsByCohort[selectedCohort].pendingInvites * (datePreset === "7d" ? 0.8 : datePreset === "3m" ? 1.2 : 1)),
    activeRate: Math.round(studentMetricsByCohort[selectedCohort].activeRate * (datePreset === "7d" ? 1.05 : datePreset === "3m" ? 0.95 : 1)),
  };

  // Get resume metrics based on cohort and date
  const currentResumeMetrics = {
    total: getScaledMetric(resumeMetricsByCohort[selectedCohort].total),
    downloads: getScaledMetric(resumeMetricsByCohort[selectedCohort].downloads),
    avgScore: getScaledMetric(resumeMetricsByCohort[selectedCohort].avgScore, false),
    highPerformers: Math.round(resumeMetricsByCohort[selectedCohort].highPerformers * (datePreset === "7d" ? 0.95 : datePreset === "3m" ? 1.05 : 1)),
  };

  // Get interview metrics based on cohort and date
  const currentInterviewMetrics = {
    total: getScaledMetric(interviewMetricsByCohort[selectedCohort].total),
    avgOverall: getScaledMetric(interviewMetricsByCohort[selectedCohort].avgOverall, false),
    avgPosture: getScaledMetric(interviewMetricsByCohort[selectedCohort].avgPosture, false),
    avgSpeech: getScaledMetric(interviewMetricsByCohort[selectedCohort].avgSpeech, false),
  };

  // Get LinkedIn metrics based on cohort and date
  const currentLinkedinMetrics = {
    uploaded: getScaledMetric(linkedinMetricsByCohort[selectedCohort].uploaded),
    optimized: getScaledMetric(linkedinMetricsByCohort[selectedCohort].optimized),
    avgScore: getScaledMetric(linkedinMetricsByCohort[selectedCohort].avgScore, false),
    highScorers: Math.round(linkedinMetricsByCohort[selectedCohort].highScorers * (datePreset === "7d" ? 0.92 : datePreset === "3m" ? 1.08 : 1)),
  };

  // Scale chart data based on date
  const getScaledChartData = <T extends Record<string, unknown>>(data: T[], valueKey: string): T[] => {
    const multiplier = dateMultipliers[datePreset];
    return data.map(item => ({
      ...item,
      [valueKey]: Math.round((item[valueKey] as number) * multiplier),
    }));
  };

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="text-lg font-semibold">Student Analytics</h2>
              <div className="flex flex-wrap items-center gap-2">
                {/* Date Filter */}
                <Select value={datePreset} onValueChange={(value) => handleDatePresetChange(value as DatePreset)}>
                  <SelectTrigger className="w-[180px]">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="3m">Last 3 months</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">This year</SelectItem>
                  </SelectContent>
                </Select>

                {/* Cohort Filter */}
                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                  <SelectTrigger className="w-[160px]">
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
                            {currentStudentMetrics.total.toLocaleString()}
                          </p>
                            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                            {currentStudentMetrics.trend}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{getDateLabel()}</p>
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
                            {currentStudentMetrics.newSignups}
                          </p>
                          <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                            {currentStudentMetrics.signupsTrend}
                          </span>
          </div>
                        <p className="text-xs text-muted-foreground">{getDateLabel()}</p>
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
                            {currentStudentMetrics.pendingInvites}
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
                            {currentStudentMetrics.activeRate}%
                          </p>
          </div>
                        <p className="text-xs text-muted-foreground">{getDateLabel()}</p>
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
                        <LineChart data={getScaledChartData(signupTrendDataByCohort[selectedCohort], "signups")}>
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
                      {activityFunnelDataByCohort[selectedCohort].map((stage) => (
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
                        {studentsNeedingAttentionByCohort[selectedCohort].map((student) => (
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="text-lg font-semibold">Resume Analytics</h2>
              <div className="flex flex-wrap items-center gap-2">
                {/* Date Filter */}
                <Select value={datePreset} onValueChange={(value) => handleDatePresetChange(value as DatePreset)}>
                  <SelectTrigger className="w-[180px]">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="3m">Last 3 months</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">This year</SelectItem>
                  </SelectContent>
                </Select>

                {/* Cohort Filter */}
                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                  <SelectTrigger className="w-[160px]">
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
                            {currentResumeMetrics.total.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{getDateLabel()}</p>
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
                            {currentResumeMetrics.downloads.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{getDateLabel()}</p>
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
                            {currentResumeMetrics.avgScore}
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
                            {currentResumeMetrics.highPerformers}%
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

            {/* Resume Score Trend & Optimization Impact */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <FadeIn delay={0.2}>
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
                        <AreaChart data={resumeScoreTrendDataByCohort[selectedCohort]}>
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

              <div className="xl:col-span-4">
                <FadeIn delay={0.25}>
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        Optimization Impact
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Score improvement after AI optimization
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 p-3 rounded-lg bg-muted/30">
                          <p className="text-xs text-muted-foreground mb-0.5">Before</p>
                          <p className="text-2xl font-bold tracking-tight">58.3</p>
                        </div>

                        <div className="shrink-0">
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                        </div>

                        <div className="flex-1 p-3 rounded-lg bg-emerald-500/10">
                          <p className="text-xs text-muted-foreground mb-0.5">After</p>
                          <p className="text-2xl font-bold text-emerald-600 tracking-tight">72.4</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium">Improvement</span>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Average score increase
                            </p>
                          </div>
                          <span className="text-lg font-bold text-emerald-600">
                            +14.1 pts
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>

            {/* Detailed Insights */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-12">
              {/* Score Distribution */}
              <div className="xl:col-span-8">
                <FadeIn delay={0.3}>
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
                        <BarChart data={getScaledChartData(scoreDistributionDataByCohort[selectedCohort], "count")}>
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
              </div>

              {/* ATS Pass Rate */}
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

            {/* Common Issues */}
            <div className="grid gap-6 grid-cols-1">
              <FadeIn delay={0.4}>
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
                        data={getScaledChartData(commonIssuesDataByCohort[selectedCohort], "count")}
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
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="text-lg font-semibold">Interview Analytics</h2>
              <div className="flex flex-wrap items-center gap-2">
                {/* Date Filter */}
                <Select value={datePreset} onValueChange={(value) => handleDatePresetChange(value as DatePreset)}>
                  <SelectTrigger className="w-[180px]">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="3m">Last 3 months</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">This year</SelectItem>
                  </SelectContent>
                </Select>

                {/* Cohort Filter */}
                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                  <SelectTrigger className="w-[160px]">
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
                            {currentInterviewMetrics.total.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{getDateLabel()}</p>
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
                            {currentInterviewMetrics.avgOverall}
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
                            {currentInterviewMetrics.avgPosture}
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
                            {currentInterviewMetrics.avgSpeech}
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

            {/* Interview Completion Trend & Optimization Impact */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <FadeIn delay={0.2}>
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
                        <AreaChart data={getScaledChartData(interviewCompletionTrendByCohort[selectedCohort], "interviews")}>
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

              <div className="xl:col-span-4">
                <FadeIn delay={0.25}>
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        Optimization Impact
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Score improvement after AI optimization
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 p-3 rounded-lg bg-muted/30">
                          <p className="text-xs text-muted-foreground mb-0.5">Before</p>
                          <p className="text-2xl font-bold tracking-tight">6.2</p>
                        </div>

                        <div className="shrink-0">
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                        </div>

                        <div className="flex-1 p-3 rounded-lg bg-emerald-500/10">
                          <p className="text-xs text-muted-foreground mb-0.5">After</p>
                          <p className="text-2xl font-bold text-emerald-600 tracking-tight">7.8</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium">Improvement</span>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Average score increase
                            </p>
                          </div>
                          <span className="text-lg font-bold text-emerald-600">
                            +1.6 pts
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>

            {/* Score Categories & Score by Interview Type */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
              {/* Score Categories Radar */}
              <FadeIn delay={0.3}>
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
                      <RadarChart data={interviewScoreCategoriesByCohort[selectedCohort]}>
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

              {/* Score by Interview Type */}
              <FadeIn delay={0.35}>
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
                      <BarChart data={interviewTypeScoresByCohort[selectedCohort]}>
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
            </div>

            {/* Common Feedback Areas */}
            <div className="grid gap-6 grid-cols-1">
              <FadeIn delay={0.4}>
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
                      {commonFeedbackAreasByCohort[selectedCohort].map((feedback, index) => (
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="text-lg font-semibold">LinkedIn Analytics</h2>
              <div className="flex flex-wrap items-center gap-2">
                {/* Date Filter */}
                <Select value={datePreset} onValueChange={(value) => handleDatePresetChange(value as DatePreset)}>
                  <SelectTrigger className="w-[180px]">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="3m">Last 3 months</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">This year</SelectItem>
                  </SelectContent>
                </Select>

                {/* Cohort Filter */}
                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                  <SelectTrigger className="w-[160px]">
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
                            {currentLinkedinMetrics.uploaded.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{getDateLabel()}</p>
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
                            {currentLinkedinMetrics.optimized.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{getDateLabel()}</p>
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
                            {currentLinkedinMetrics.avgScore}
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
                            {currentLinkedinMetrics.highScorers}%
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
                        <BarChart data={getScaledChartData(linkedinScoreDistributionByCohort[selectedCohort], "count")}>
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

              {/* Optimization Impact */}
              <FadeIn delay={0.25}>
                <Card className="rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Optimization Impact
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Score improvement after AI optimization
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 p-3 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground mb-0.5">Before</p>
                        <p className="text-2xl font-bold tracking-tight">54.2</p>
                      </div>

                      <div className="shrink-0">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                      </div>

                      <div className="flex-1 p-3 rounded-lg bg-emerald-500/10">
                        <p className="text-xs text-muted-foreground mb-0.5">After</p>
                        <p className="text-2xl font-bold text-emerald-600 tracking-tight">68.5</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">Improvement</span>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Average score increase
                          </p>
                        </div>
                        <span className="text-lg font-bold text-emerald-600">
                          +14.3 pts
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            {/* Common Issues & Section Completeness */}
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
                          data={getScaledChartData(linkedinCommonIssuesByCohort[selectedCohort], "count")}
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
                        Section Completeness
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Profile section completion rates
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {sectionCompletenessByCohort[selectedCohort].map((section) => (
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
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={
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
        <main className="flex-1 w-full max-w-full overflow-x-hidden p-4 md:p-6 xl:p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Loading analytics...</div>
          </div>
        </main>
      </div>
    }>
      <AnalyticsContent />
    </Suspense>
  );
}
