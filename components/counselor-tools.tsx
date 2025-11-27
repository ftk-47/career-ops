"use client";

import { useState } from "react";
import { AnimatedCard } from "@/components/motion/animated-card";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  FileSearch,
  ShieldAlert,
  MessageSquare,
  Target,
  ArrowUpRight,
  Upload,
} from "lucide-react";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  colorClasses: {
    headerBg: string;
    iconBg: string;
    iconColor: string;
    borderColor: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    buttonHover: string;
    insightBg: string;
  };
  modalContent: {
    shortDescription: string;
    primaryCTA: string;
    secondaryCTA: string;
    secondaryTooltip: string;
  };
}

const counselorTools: Tool[] = [
  {
    id: "jd-decoder",
    title: "JD Decoder",
    description: "Find key skills from any job posting.",
    icon: FileSearch,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-500",
    colorClasses: {
      headerBg: "bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent",
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-600 dark:text-blue-500",
      borderColor: "border-l-blue-500",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-600 dark:text-blue-500",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      buttonHover: "hover:border-blue-500/50",
      insightBg: "bg-blue-500/5",
    },
    modalContent: {
      shortDescription: "Understand job descriptions instantly — extract skills, keywords, and insights to guide student coaching.",
      primaryCTA: "Analyze JD",
      secondaryCTA: "Use Sample",
      secondaryTooltip: "Load a sample JD to preview extracted skills and insights.",
    },
  },
  {
    id: "resume-red-flag",
    title: "Resume Red-Flag Detector",
    description: "Identify ATS blockers instantly.",
    icon: ShieldAlert,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600 dark:text-red-500",
    colorClasses: {
      headerBg: "bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent",
      iconBg: "bg-red-500/15",
      iconColor: "text-red-600 dark:text-red-500",
      borderColor: "border-l-red-500",
      badgeBg: "bg-red-500/10",
      badgeText: "text-red-600 dark:text-red-500",
      buttonBg: "bg-red-600 hover:bg-red-700",
      buttonHover: "hover:border-red-500/50",
      insightBg: "bg-red-500/5",
    },
    modalContent: {
      shortDescription: "Spot resume weaknesses and keyword gaps to help students create stronger, ATS-ready applications.",
      primaryCTA: "Scan Resume",
      secondaryCTA: "Use Sample",
      secondaryTooltip: "Try a sample resume to see issue detection and feedback flow.",
    },
  },
  {
    id: "mock-interview",
    title: "Interview Answer Analyzer",
    description: "Assess spoken answers for clarity.",
    icon: MessageSquare,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-500",
    colorClasses: {
      headerBg: "bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent",
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-600 dark:text-purple-500",
      borderColor: "border-l-purple-500",
      badgeBg: "bg-purple-500/10",
      badgeText: "text-purple-600 dark:text-purple-500",
      buttonBg: "bg-purple-600 hover:bg-purple-700",
      buttonHover: "hover:border-purple-500/50",
      insightBg: "bg-purple-500/5",
    },
    modalContent: {
      shortDescription: "Evaluate interview responses with AI to identify communication strengths and coaching opportunities.",
      primaryCTA: "Analyze Interview",
      secondaryCTA: "Use Sample",
      secondaryTooltip: "Load a sample interview transcript to preview analysis results.",
    },
  },
  {
    id: "employer-alignment",
    title: "Employer Alignment Analyzer",
    description: "Find trending skills & hiring cues.",
    icon: Target,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-500",
    colorClasses: {
      headerBg: "bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent",
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-600 dark:text-emerald-500",
      borderColor: "border-l-emerald-500",
      badgeBg: "bg-emerald-500/10",
      badgeText: "text-emerald-600 dark:text-emerald-500",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700",
      buttonHover: "hover:border-emerald-500/50",
      insightBg: "bg-emerald-500/5",
    },
    modalContent: {
      shortDescription: "Uncover company culture and role expectations to align student profiles with employer priorities.",
      primaryCTA: "Assess Alignment",
      secondaryCTA: "Use Sample",
      secondaryTooltip: "View sample employer data to see alignment insights in action.",
    },
  },
];

const CARD_GRADIENTS: Record<string, string> = {
  "jd-decoder": "from-blue-50 via-white to-white dark:from-blue-500/20 dark:via-background dark:to-background",
  "resume-red-flag": "from-rose-50 via-white to-white dark:from-rose-500/20 dark:via-background dark:to-background",
  "mock-interview": "from-purple-50 via-white to-white dark:from-purple-500/20 dark:via-background dark:to-background",
  "employer-alignment": "from-emerald-50 via-white to-white dark:from-emerald-500/20 dark:via-background dark:to-background",
};

const ICON_GRADIENTS: Record<string, string> = {
  "jd-decoder": "bg-gradient-to-br from-blue-500/20 via-blue-500/5 to-white dark:from-blue-500/40 dark:via-blue-500/10 dark:to-transparent",
  "resume-red-flag": "bg-gradient-to-br from-rose-500/20 via-rose-500/5 to-white dark:from-rose-500/40 dark:via-rose-500/10 dark:to-transparent",
  "mock-interview": "bg-gradient-to-br from-purple-500/20 via-purple-500/5 to-white dark:from-purple-500/40 dark:via-purple-500/10 dark:to-transparent",
  "employer-alignment": "bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-white dark:from-emerald-500/40 dark:via-emerald-500/10 dark:to-transparent",
};

const GLOW_COLORS: Record<string, string> = {
  "jd-decoder": "bg-blue-500/25",
  "resume-red-flag": "bg-rose-500/25",
  "mock-interview": "bg-purple-500/25",
  "employer-alignment": "bg-emerald-500/25",
};

export function CounselorTools() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input states
  const [jdText, setJdText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [interviewText, setInterviewText] = useState("");
  const [employerText, setEmployerText] = useState("");

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedTool(null);
      // Reset inputs
      setJdText("");
      setResumeText("");
      setInterviewText("");
      setEmployerText("");
    }, 200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.info(`File "${file.name}" uploaded (mock)`);
      // In a real implementation, you would process the file here
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Mock submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Analysis complete! (This is a mock demo)");
      handleCloseModal();
    }, 1500);
  };

  const renderActionInterface = () => {
    if (!selectedTool) return null;

    switch (selectedTool.id) {
      case "jd-decoder":
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="jd-input">Paste or upload job description</Label>
              <Textarea
                id="jd-input"
                placeholder="Paste the job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="min-h-32 resize-none"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => document.getElementById("jd-file")?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      className="gap-2"
                      onClick={() => {}}
                    >
                      {selectedTool?.modalContent.secondaryCTA}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>{selectedTool?.modalContent.secondaryTooltip}</p>
                  </TooltipContent>
                </Tooltip>
                <input
                  id="jd-file"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span className="text-xs text-muted-foreground">
                  PDF, DOCX, or TXT
                </span>
              </div>
            </div>
          </div>
        );

      case "resume-red-flag":
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="resume-input">Resume</Label>
              <Textarea
                id="resume-input"
                placeholder="Paste the resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-32 resize-none"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => document.getElementById("resume-file")?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Upload Resume
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      className="gap-2"
                      onClick={() => {}}
                    >
                      {selectedTool?.modalContent.secondaryCTA}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>{selectedTool?.modalContent.secondaryTooltip}</p>
                  </TooltipContent>
                </Tooltip>
                <input
                  id="resume-file"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span className="text-xs text-muted-foreground">
                  PDF, DOCX, or TXT
                </span>
              </div>
            </div>
          </div>
        );

      case "mock-interview":
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="interview-input">Paste interview transcript or upload recording</Label>
              <Textarea
                id="interview-input"
                placeholder="Paste the interview transcript or responses here..."
                value={interviewText}
                onChange={(e) => setInterviewText(e.target.value)}
                className="min-h-32 resize-none"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => document.getElementById("interview-file")?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      className="gap-2"
                      onClick={() => {}}
                    >
                      {selectedTool?.modalContent.secondaryCTA}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>{selectedTool?.modalContent.secondaryTooltip}</p>
                  </TooltipContent>
                </Tooltip>
                <input
                  id="interview-file"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.mp3,.mp4,.wav"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span className="text-xs text-muted-foreground">
                  Transcript or audio/video file
                </span>
              </div>
            </div>
          </div>
        );

      case "employer-alignment":
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="employer-input">Paste employer materials or upload documents</Label>
              <Textarea
                id="employer-input"
                placeholder="Paste employer materials (website copy, mission statement, values, etc.)..."
                value={employerText}
                onChange={(e) => setEmployerText(e.target.value)}
                className="min-h-32 resize-none"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => document.getElementById("employer-file")?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      className="gap-2"
                      onClick={() => {}}
                    >
                      {selectedTool?.modalContent.secondaryCTA}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>{selectedTool?.modalContent.secondaryTooltip}</p>
                  </TooltipContent>
                </Tooltip>
                <input
                  id="employer-file"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span className="text-xs text-muted-foreground">
                  PDF, DOCX, or TXT
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 max-w-full">
        {counselorTools.map((tool, index) => (
            <AnimatedCard key={tool.id} delay={index * 0.05}>
              <Card
              className="rounded-4xl py-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group relative overflow-hidden border border-border/60 dark:border-border/50"
                onClick={() => handleToolClick(tool)}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${
                    CARD_GRADIENTS[tool.id] ??
                    "from-white via-white to-white dark:from-white/10 dark:via-background dark:to-background"
                  } opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden
                />
                <div
                  className={`absolute inset-0 scale-[0.98] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    GLOW_COLORS[tool.id] ?? "bg-primary/25"
                  }`}
                  aria-hidden
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/5 pointer-events-none" />

              <CardContent className="relative z-10 p-4 flex flex-col gap-3 text-left">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      ICON_GRADIENTS[tool.id] ?? tool.iconBg
                    } transition-transform group-hover:scale-105 shrink-0 ring-1 ring-black/5 dark:ring-white/10 shadow-inner`}
                  >
                    <tool.icon className={`h-5 w-5 ${tool.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm text-foreground truncate">
                        {tool.title}
                      </h3>
                      <div className="rounded-full border border-border/60 dark:border-border/40 p-1 text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors bg-background/60 dark:bg-background/30 shrink-0">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug line-clamp-2 ">
                      {tool.description}
                    </p>
                  </div>
                </div>
                {/* <div className="h-px bg-linear-to-r from-transparent via-border/80 to-transparent dark:via-border/40" /> */}
                {/* <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-muted-foreground/80">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      GLOW_COLORS[tool.id]?.replace("/25", "/60") ?? "bg-primary/60"
                    }`}
                  />
                  <span>{tool.modalContent.primaryCTA}</span>
                </div> */}
              </CardContent>
            </Card>
          </AnimatedCard>
        ))}
      </div>

      {/* Tool Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-[90vw] sm:max-w-xl max-h-[95vh] w-full p-0 gap-0">
          {selectedTool && (
            <div className="flex flex-col h-full">
              {/* Enhanced Header with Colored Background */}
              <div className={`px-6 py-5 border-b ${selectedTool.colorClasses.headerBg}`}>
                <div className="flex gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${selectedTool.colorClasses.iconBg} shadow-sm shrink-0`}
                  >
                    <selectedTool.icon
                      className={`h-6 w-6 ${selectedTool.colorClasses.iconColor}`}
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1 min-w-0">
                    <DialogTitle className="text-xl font-semibold text-foreground leading-tight">
                      {selectedTool.title}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {selectedTool.modalContent.shortDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="p-5 space-y-3 flex-1 overflow-y-auto">
                  <div className="space-y-3">
                    {renderActionInterface()}
                  </div>
                </div>

                {/* Action Button - Sticky at bottom */}
                <div className="p-5 pt-3 border-t bg-background/95 backdrop-blur">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full gap-2"
                    size="default"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        {selectedTool?.modalContent.primaryCTA}
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
