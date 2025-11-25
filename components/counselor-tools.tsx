"use client";

import { useState } from "react";
import { AnimatedCard } from "@/components/motion/animated-card";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  FileSearch,
  ShieldAlert,
  MessageSquare,
  Target,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  AlertCircle,
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
    description: string;
    benefits: Array<{
      icon: React.ElementType;
      title: string;
      description: string;
    }>;
    exampleInsights: string[];
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
      description:
        "Analyze job descriptions and extract coaching insights to help your students align their resumes and applications with employer expectations.",
      benefits: [
        {
          icon: CheckCircle2,
          title: "Skills Extraction",
          description: "Automatically identify and extract key skills required",
        },
        {
          icon: CheckCircle2,
          title: "Keyword Identification",
          description: "Highlight critical keywords for ATS optimization",
        },
        {
          icon: CheckCircle2,
          title: "Competency Mapping",
          description: "Map required competencies to coaching strategies",
        },
        {
          icon: CheckCircle2,
          title: "Coaching Suggestions",
          description: "Get actionable coaching recommendations",
        },
      ],
      exampleInsights: [
        "Ask your student to add metrics here to demonstrate impact",
        "Highlight leadership experience due to this JD requirement",
        "This JD prioritizes project ownership — coach them to add specific examples",
        "Recommend quantifying achievements in bullets 2 and 4",
        "This role emphasizes collaboration — suggest team-based examples",
      ],
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
      description:
        "Identify resume issues and provide coaching recommendations to help students create more impactful and ATS-friendly resumes.",
      benefits: [
        {
          icon: AlertCircle,
          title: "Impact Analysis",
          description: "Detect weak bullets lacking quantification",
        },
        {
          icon: AlertCircle,
          title: "Keyword Gap Detection",
          description: "Identify missing keywords from job descriptions",
        },
        {
          icon: AlertCircle,
          title: "Formatting Issues",
          description: "Spot formatting problems that hurt ATS scores",
        },
        {
          icon: AlertCircle,
          title: "Structure Recommendations",
          description: "Suggest better section ordering and organization",
        },
      ],
      exampleInsights: [
        "This bullet lacks impact — suggest quantification with specific metrics",
        "These keywords are missing — recommend adding them in experience section",
        "Section order mismatch — advise restructuring to prioritize experience",
        "Weak action verbs detected — suggest stronger alternatives",
        "Inconsistent formatting in dates — recommend standardizing format",
      ],
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
      description:
        "Evaluate interview responses and provide coaching priorities to help students improve their interview performance and communication skills.",
      benefits: [
        {
          icon: TrendingUp,
          title: "STAR Method Analysis",
          description: "Evaluate answer structure using STAR framework",
        },
        {
          icon: TrendingUp,
          title: "Tone Evaluation",
          description: "Assess communication tone and confidence level",
        },
        {
          icon: TrendingUp,
          title: "Follow-up Questions",
          description: "Generate coaching questions for deeper insights",
        },
        {
          icon: TrendingUp,
          title: "Coaching Priorities",
          description: "Identify key areas needing improvement",
        },
      ],
      exampleInsights: [
        "Good follow-up questions to ask: 'Can you provide a specific metric?'",
        "Coaching priority: Help student structure answers using STAR method",
        "Assignment: Practice describing a conflict resolution example",
        "Strength: Student demonstrates clear communication skills",
        "Improvement area: Add more concrete examples to showcase impact",
      ],
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
      description:
        "Extract employer priorities and recommend student examples to help align candidates with company culture and role requirements.",
      benefits: [
        {
          icon: Lightbulb,
          title: "Company Culture Analysis",
          description: "Extract key values and culture priorities",
        },
        {
          icon: Lightbulb,
          title: "Competency Extraction",
          description: "Identify top competencies from company materials",
        },
        {
          icon: Lightbulb,
          title: "Example Recommendations",
          description: "Suggest specific student examples to highlight",
        },
        {
          icon: Lightbulb,
          title: "Alignment Scoring",
          description: "Rate student-employer fit on key dimensions",
        },
      ],
      exampleInsights: [
        "This employer prioritizes analytical thinking — recommend examples X, Y, Z",
        "Top competencies extracted: Innovation, collaboration, data-driven decisions",
        "Company culture emphasizes ownership — coach student on autonomy examples",
        "This role values cross-functional work — highlight team project experiences",
        "Mission alignment opportunity: Student's volunteer work matches company values",
      ],
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
                <Button
                  size="sm"
                  className="gap-2"
                >
                  Use Sample
                </Button>
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
                <Button
                  size="sm"
                  className="gap-2"
                >
                  Use Sample
                </Button>
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
                <Button
                  size="sm"
                  className="gap-2"
                >
                  Use Sample
                </Button>
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
                <Button
                  size="sm"
                  className="gap-2"
                >
                  Use Sample
                </Button>
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
        <DialogContent className="max-w-[90vw] lg:max-w-6xl max-h-[95vh] w-full p-0 gap-0">
          {selectedTool && (
            <div className="flex flex-col h-full">
              {/* Enhanced Header with Colored Background */}
              <div className={`px-5 py-4 border-b ${selectedTool.colorClasses.headerBg}`}>
                <DialogTitle className={`flex items-center gap-2.5 text-lg font-bold ${selectedTool.colorClasses.iconColor}`}>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${selectedTool.colorClasses.iconBg} shadow-sm`}
                  >
                    <selectedTool.icon
                      className={`h-4 w-4 ${selectedTool.colorClasses.iconColor}`}
                    />
                  </div>
                  {selectedTool.title}
                </DialogTitle>
              </div>

              {/* Two Column Layout */}
              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Left Column - Information */}
                <div className="flex-1 lg:w-3/5 overflow-y-auto">
                  <ScrollArea className="h-full">
                    <div className="p-5 space-y-4">
                  {/* Description with improved typography */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedTool.modalContent.description}
                  </p>

                      {/* Benefits */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wide flex items-center gap-2 text-muted-foreground">
                          <div className="h-0.5 w-4 rounded-full bg-primary/30" />
                          Key Features
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedTool.modalContent.benefits.map(
                            (benefit, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 rounded-md border bg-muted/20 p-2 transition-all duration-200 hover:border-primary/30 hover:bg-muted/40 h-full"
                              >
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 shrink-0">
                                  <benefit.icon className="h-3 w-3 text-primary" />
                                </div>
                                <div className="space-y-0.5 flex-1 min-w-0">
                                  <p className="text-xs font-semibold leading-tight">
                                    {benefit.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground leading-snug">
                                    {benefit.description}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                  {/* Example Insights */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wide flex items-center gap-2 text-muted-foreground">
                          <div className="h-0.5 w-4 rounded-full bg-primary/30" />
                      Sample Insights
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="inline-flex">
                                <Badge variant="info" className="text-[10px] px-1.5 py-0.5 cursor-help" asChild>
                                  <span>Personalizable</span>
                                </Badge>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" sideOffset={5} className="max-w-xs">
                              <p>We personalize the insights based on your university requirements</p>
                            </TooltipContent>
                          </Tooltip>
                    </h3>
                        <div className="rounded-md border bg-muted/20 p-3 space-y-2">
                      {selectedTool.modalContent.exampleInsights.map(
                        (insight, idx) => (
                          <div
                            key={idx}
                                className="flex items-start gap-2"
                          >
                            <div
                                  className="shrink-0 mt-0.5 h-4 w-4 flex items-center justify-center rounded-full text-[10px] font-semibold bg-primary/10 text-primary"
                            >
                              {idx + 1}
                            </div>
                                <p className="text-xs leading-snug text-foreground/90">
                              {insight}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
                </div>

                {/* Right Column - Action Panel */}
                <div className="lg:w-2/5 border-t lg:border-t-0 lg:border-l bg-muted/30 flex flex-col">
                  <div className="p-5 space-y-3 flex-1 overflow-y-auto">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4" />
                        Get Started
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Input your data below to analyze
                      </p>
                    </div>

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
                          Analyze
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
