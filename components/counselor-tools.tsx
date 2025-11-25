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
    title: "JD Decoder for Counselors",
    description: "Analyze job descriptions",
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
    description: "Identify resume issues",
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
    title: "Interview Assessment Helper",
    description: "Evaluate interview responses",
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
    description: "Extract employer priorities",
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
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 max-w-full">
        {counselorTools.map((tool, index) => (
          <AnimatedCard key={tool.id} delay={index * 0.05}>
            <Card
              className="rounded-xl shadow-sm py-0 transition-all duration-200 hover:shadow-lg hover:scale-[1.03] cursor-pointer group relative overflow-hidden bg-linear-to-br from-primary/5 to-transparent border-primary/20 h-full"
              onClick={() => handleToolClick(tool)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center gap-3 h-full">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.iconBg} transition-transform group-hover:scale-110 shrink-0`}
                >
                  <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                </div>
                <div className="space-y-1 flex-1 flex flex-col justify-center">
                  <h3 className="font-semibold text-sm leading-tight">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
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
