"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BarChart3,
  Brain,
  Users,
  Rocket,
  X,
} from "lucide-react";

interface WelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Slide {
  id: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  image: string;
  imageAlt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    icon: Sparkles,
    iconBg: "bg-gradient-to-br from-primary/20 to-primary/5",
    iconColor: "text-primary",
    title: "Welcome to Hiration",
    subtitle: "Control Center",
    description:
      "This is a demo platform showcasing the complete counselor experience. Explore powerful tools designed to help career counselors guide students to success.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    imageAlt: "Modern office workspace with analytics",
  },
  {
    id: 2,
    icon: BarChart3,
    iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "Powerful Analytics",
    subtitle: "at Your Fingertips",
    description:
      "Get real-time insights into student progress, team productivity, and program effectiveness with comprehensive dashboards.",
    features: [
      "Track student engagement & scores",
      "Monitor team review metrics",
      "Identify students needing attention",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Analytics dashboard visualization",
  },
  {
    id: 3,
    icon: Brain,
    iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-600 dark:text-purple-400",
    title: "AI-Powered Tools",
    subtitle: "That Accelerate Your Workflow",
    description:
      "Leverage cutting-edge AI to analyze job descriptions, detect resume issues, and evaluate interview responses instantly.",
    features: [
      "JD Decoder - Extract key skills",
      "Resume Red-Flag Detector",
      "Interview Answer Analyzer",
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    imageAlt: "AI technology visualization",
  },
  {
    id: 4,
    icon: Users,
    iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Comprehensive",
    subtitle: "Student Management",
    description:
      "Manage student portfolios, review submissions, organize cohorts, and track progress all in one unified platform.",
    features: [
      "Student portfolio tracking",
      "Resume & cover letter reviews",
      "Cohort organization",
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    imageAlt: "Students collaborating",
  },
  {
    id: 5,
    icon: Rocket,
    iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Ready to Explore?",
    subtitle: "",
    description:
      "Dive into the platform and discover how Hiration can transform your career counseling workflow. Let's get started!",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    imageAlt: "Team success celebration",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function WelcomeModal({ open, onOpenChange }: WelcomeModalProps) {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);

  // Reset to first slide when modal opens
  useEffect(() => {
    if (open) {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => setSlide([0, 0]), 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const paginate = (newDirection: number) => {
    const nextSlide = currentSlide + newDirection;
    if (nextSlide >= 0 && nextSlide < slides.length) {
      setSlide([nextSlide, newDirection]);
    }
  };

  const goToSlide = (index: number) => {
    const direction = index > currentSlide ? 1 : -1;
    setSlide([index, direction]);
  };

  const handleComplete = () => {
    onOpenChange(false);
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;
  const isFirstSlide = currentSlide === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[70vw] sm:max-w-[675px] md:max-w-[800px] lg:max-w-[900px] p-0 gap-0 overflow-hidden border-0 shadow-2xl"
        showCloseButton={false}
      >
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Skip Button */}
        <motion.button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="h-4 w-4" />
        </motion.button>

        <div className="relative z-10 flex flex-col md:flex-row h-[600px]">
          {/* Content Side */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="space-y-6"
              >
                {/* Icon Badge */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.4, delay: 0 }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${slide.iconBg} shadow-lg`}
                  >
                    <slide.icon className={`h-7 w-7 ${slide.iconColor}`} />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="space-y-1"
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {slide.subtitle}
                    </h3>
                  )}
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md"
                >
                  {slide.description}
                </motion.p>

                {/* Features List */}
                {slide.features && (
                  <motion.ul
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="space-y-2"
                  >
                    {slide.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {/* CTA Button for Last Slide */}
                {isLastSlide && (
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="pt-4"
                  >
                    <Button
                      size="lg"
                      onClick={handleComplete}
                      className="gap-2 text-base px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Rocket className="h-5 w-5" />
                      Let&apos;s Get Started
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-auto pt-8 flex items-center justify-between">
              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative"
                  >
                    <motion.div
                      className={`h-2 rounded-full transition-colors duration-300 ${
                        index === currentSlide
                          ? "bg-primary w-8"
                          : "bg-muted hover:bg-muted-foreground/30 w-2"
                      }`}
                      layoutId="progressDot"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-2">
                {!isFirstSlide && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => paginate(-1)}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                  </motion.div>
                )}
                {!isLastSlide && (
                  <Button
                    size="sm"
                    onClick={() => paginate(1)}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="hidden md:block w-[45%] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {/* Gradient Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/40 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent z-10 pointer-events-none" />
                
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 0vw, 45vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Decorative Border */}
            <div className="absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/60"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

