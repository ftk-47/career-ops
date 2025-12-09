"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { AnimatedCard } from "@/components/motion/animated-card";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Download,
  Clock,
  Zap,
  Users,
  Mail,
  ClipboardCheck,
  MessageSquare,
  BarChart,
  Calendar,
  Briefcase,
  Search,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  category: string;
}

interface Template {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  fileType: string;
  previewSnippet: string;
}

const guides: Guide[] = [
  {
    id: "feedback-5min",
    title: "How to Give Feedback in 5 Minutes",
    description: "Quick, actionable feedback techniques.",
    icon: Clock,
    duration: "5 min read",
    category: "Feedback",
  },
  {
    id: "efficient-1on1",
    title: "How to Run 1:1s More Efficiently",
    description: "Streamlined frameworks for productive student meetings",
    icon: Users,
    duration: "7 min read",
    category: "Coaching",
  },
  {
    id: "scale-prep",
    title: "How to Scale Prep with Limited Resources",
    description: "Leverage AI and automation to multiply your impact",
    icon: Zap,
    duration: "8 min read",
    category: "Strategy",
  },
  {
    id: "ai-best-practices",
    title: "AI in Career Services: Best Practices",
    description: "Ethical, effective integration of AI into your coaching workflow",
    icon: Lightbulb,
    duration: "10 min read",
    category: "Technology",
  },
];

const templates: Template[] = [
  {
    id: "student-outreach",
    title: "Student Outreach Templates",
    description: "Pre-written emails for every engagement scenario",
    icon: Mail,
    category: "Communication",
    fileType: "DOCX",
    previewSnippet:
      "Includes: Welcome email, deadline reminder, re-engagement nudge, congratulations on offer, check-in after rejection, workshop invitation, and more...",
  },
  {
    id: "resume-critique",
    title: "Resume Critique Checklist",
    description: "Comprehensive rubric for consistent resume reviews",
    icon: ClipboardCheck,
    category: "Assessment",
    fileType: "PDF",
    previewSnippet:
      "40-point evaluation covering: formatting, ATS optimization, action verbs, quantification, impact, relevance, grammar, contact info, and strategic positioning...",
  },
  {
    id: "mock-interview-rubric",
    title: "Mock Interview Rubric",
    description: "Structured scoring guide for interview assessments",
    icon: MessageSquare,
    category: "Assessment",
    fileType: "PDF",
    previewSnippet:
      "Evaluates: STAR method usage, clarity, confidence, body language, question handling, company knowledge, role fit, follow-up questions, and closing statements...",
  },
  {
    id: "skill-gap-feedback",
    title: "Skill-Gap Feedback Format",
    description: "Template for identifying and addressing skill deficiencies",
    icon: BarChart,
    category: "Feedback",
    fileType: "DOCX",
    previewSnippet:
      "Framework: Current skill assessment, gap analysis, priority development areas, recommended resources, action plan with timeline, and follow-up schedule...",
  },
  {
    id: "workshop-scripts",
    title: "Workshop Scripts",
    description: "Ready-to-deliver content for common workshop topics",
    icon: Lightbulb,
    category: "Training",
    fileType: "DOCX",
    previewSnippet:
      "Includes: Resume Writing 101, LinkedIn Optimization, Networking Strategies, Interview Prep Bootcamp, Salary Negotiation, Career Fair Success - all with slides and talking points...",
  },
  {
    id: "job-search-plan",
    title: "4-Week Student Job Search Plan",
    description: "Week-by-week roadmap for structured job searching",
    icon: Calendar,
    category: "Planning",
    fileType: "PDF",
    previewSnippet:
      "Week 1: Profile setup & target company research | Week 2: Resume/cover letter optimization | Week 3: Application sprint & networking | Week 4: Interview prep & follow-ups...",
  },
];

export default function CoachingLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set([...guides.map((g) => g.category), ...templates.map((t) => t.category)])),
  ];

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (templateTitle: string) => {
    toast.success(`Downloading ${templateTitle} (Demo)`);
    // In a real implementation, this would trigger an actual file download
  };

  const handleViewGuide = (guideTitle: string) => {
    toast.info(`Opening ${guideTitle} (Demo)`);
    // In a real implementation, this would open the guide in a modal or new page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Coaching Library"
        description="Premium resources to help you coach more effectively and efficiently"
        actions={
          <Badge variant="default" className="text-sm px-3 py-1">
            <CheckCircle className="h-3 w-3 mr-1" />
            Free Resources
          </Badge>
        }
      />

      <main className="p-4 md:p-6 xl:p-8 space-y-6 w-full">
        {/* Search and Filter Bar */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guides and templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm h-9"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">Category:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px] h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize text-sm">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </FadeIn>

        {/* Advisor Coaching Guides Section */}
        <div className="space-y-3">
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="text-base font-bold">Advisor Coaching Guides</h2>
                <p className="text-xs text-muted-foreground">
                  In-depth guides to enhance your coaching practice
                </p>
              </div>
            </div>
          </FadeIn>

          {filteredGuides.length === 0 ? (
            <FadeIn delay={0.25}>
              <Card className="p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No guides match your search. Try adjusting your filters.
                </p>
              </Card>
            </FadeIn>
          ) : (
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
              {filteredGuides.map((guide, index) => (
                <AnimatedCard key={guide.id} delay={0.25 + index * 0.03}>
                  <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary h-full p-2">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <guide.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="space-y-1.5">
                            <h3 className="font-semibold text-sm leading-tight">
                              {guide.title}
                            </h3>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                {guide.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {guide.duration}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {guide.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-8 px-3 shrink-0"
                          onClick={() => handleViewGuide(guide.title)}
                        >
                          View Guide
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>

        {/* Playbooks & Templates Section */}
        <div className="space-y-3">
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div>
                <h2 className="text-base font-bold">Playbooks & Templates</h2>
                <p className="text-xs text-muted-foreground">
                  Ready-to-use resources for your daily workflow
                </p>
              </div>
            </div>
          </FadeIn>

          {filteredTemplates.length === 0 ? (
            <FadeIn delay={0.35}>
              <Card className="p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No templates match your search. Try adjusting your filters.
                </p>
              </Card>
            </FadeIn>
          ) : (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredTemplates.map((template, index) => (
                <AnimatedCard key={template.id} delay={0.35 + index * 0.03}>
                  <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                          <template.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <h3 className="font-semibold text-sm leading-tight">
                            {template.title}
                          </h3>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              {template.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              {template.fileType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {template.description}
                      </p>
                      <div className="rounded-md bg-muted/40 p-2.5 text-[11px] leading-relaxed text-muted-foreground mb-3 line-clamp-2 min-h-[44px]">
                        {template.previewSnippet}
                      </div>
                      <Button
                        onClick={() => handleDownload(template.title)}
                        className="w-full gap-2 text-xs h-8"
                        size="sm"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download Template
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <FadeIn delay={0.5}>
          <Card className="rounded-xl bg-linear-to-br from-primary/5 via-primary/3 to-transparent border-primary/20 shadow-sm p-2">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left space-y-1">
                  <h3 className="text-base font-bold">
                    Need More Personalized Support?
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Book a consultation with our expert team to discuss your
                    specific coaching challenges and get customized strategies.
                  </p>
                </div>
                <Button size="sm" className="shrink-0 h-9">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </main>
    </div>
  );
}

