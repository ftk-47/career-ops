"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  GraduationCap,
  Briefcase,
  X,
  Rocket,
} from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  teamSize: string;
  studentCount: string;
  role: string;
}

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

const teamSizeOptions = [
  { value: "solo", label: "Solo Counselor", icon: Briefcase },
  { value: "small", label: "Small Team (2-5)", icon: Users },
  { value: "medium", label: "Medium Team (6-15)", icon: Users },
  { value: "large", label: "Large Team (16+)", icon: Users },
];

const studentCountOptions = [
  { value: "< 100", label: "< 100" },
  { value: "100-1,000", label: "100 - 1,000" },
  { value: "1,000-5,000", label: "1,000 - 5,000" },
  { value: "5,000-10,000", label: "5,000 - 10,000" },
  { value: "10,000-20,000", label: "10,000 - 20,000" },
  { value: "20,000+", label: "20,000+" },
];

const roleOptions = [
  { value: "counselor", label: "Career Counselor" },
  { value: "senior_counselor", label: "Senior Career Counselor" },
  { value: "coordinator", label: "Career Services Coordinator" },
  { value: "assistant_director", label: "Assistant/Associate Director" },
  { value: "director", label: "Director" },
];

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [[currentStep, direction], setStep] = useState([1, 0]);
  const [formData, setFormData] = useState<FormData>({
    teamSize: "",
    studentCount: "",
    role: "",
  });
  // Track which question in step 2 (1 = team size, 2 = student count, 3 = role)
  const [currentQuestion, setCurrentQuestion] = useState(1);
  // Track custom input values
  const [customInputs, setCustomInputs] = useState({
    teamSize: "",
    studentCount: "",
    role: "",
  });
  // Track which fields are showing custom input
  const [showCustomInput, setShowCustomInput] = useState({
    teamSize: false,
    studentCount: false,
    role: false,
  });
  // Track if showing thank you message
  const [showThankYou, setShowThankYou] = useState(false);

  // Reset to first step when modal opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setStep([1, 0]);
        setFormData({ teamSize: "", studentCount: "", role: "" });
        setCustomInputs({ teamSize: "", studentCount: "", role: "" });
        setShowCustomInput({ teamSize: false, studentCount: false, role: false });
        setCurrentQuestion(1);
        setShowThankYou(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const paginate = (newDirection: number) => {
    const nextStep = currentStep + newDirection;
    if (nextStep >= 1 && nextStep <= 2) {
      setStep([nextStep, newDirection]);
      if (nextStep === 2) {
        setCurrentQuestion(1);
      }
    }
  };

  const handleQuestionAnswer = (field: keyof FormData, value: string) => {
    if (value === "other") {
      // Show custom input for this field
      setShowCustomInput({ ...showCustomInput, [field]: true });
      setFormData({ ...formData, [field]: "" });
    } else {
      setFormData({ ...formData, [field]: value });
      setShowCustomInput({ ...showCustomInput, [field]: false });
      
      // Check if this is the final question
      if (field === "role" && currentQuestion === 3) {
        // Show thank you message
        setTimeout(() => {
          setShowThankYou(true);
          // Close modal after showing thank you
          setTimeout(() => {
            handleComplete();
          }, 2000);
        }, 300);
      } else {
        // Auto-advance to next question after a short delay
        setTimeout(() => {
          if (field === "teamSize" && currentQuestion === 1) {
            setCurrentQuestion(2);
          } else if (field === "studentCount" && currentQuestion === 2) {
            setCurrentQuestion(3);
          }
        }, 300);
      }
    }
  };

  const handleCustomInputSubmit = (field: keyof FormData) => {
    if (customInputs[field].trim()) {
      setFormData({ ...formData, [field]: customInputs[field] });
      
      // Check if this is the final question
      if (field === "role" && currentQuestion === 3) {
        // Show thank you message
        setTimeout(() => {
          setShowThankYou(true);
          // Close modal after showing thank you
          setTimeout(() => {
            handleComplete();
          }, 2000);
        }, 300);
      } else {
        // Auto-advance to next question
        setTimeout(() => {
          if (field === "teamSize" && currentQuestion === 1) {
            setCurrentQuestion(2);
          } else if (field === "studentCount" && currentQuestion === 2) {
            setCurrentQuestion(3);
          }
        }, 300);
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentQuestion === 1) {
      paginate(-1);
    }
  };

  const handleComplete = () => {
    // Store completion in sessionStorage
    sessionStorage.setItem("onboarding-completed", "true");
    onOpenChange(false);
  };

  const handleSkip = () => {
    sessionStorage.setItem("onboarding-completed", "true");
    onOpenChange(false);
  };

  const isFormValid = formData.teamSize && formData.studentCount && formData.role;
  const isStep1 = currentStep === 1;
  const isStep2 = currentStep === 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[90vw] sm:max-w-[600px] md:max-w-[700px] p-0 gap-0 overflow-hidden border-0 shadow-2xl"
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

        <div className="relative z-10 flex flex-col min-h-[500px]">
          {/* Content */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="space-y-6 flex-1"
              >
                {/* Step 1: Welcome */}
                {isStep1 && (
                  <>
                    {/* Icon Badge */}
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.4, delay: 0 }}
                    >
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg">
                        <Sparkles className="h-7 w-7 text-primary" />
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
                        Welcome to Hiration
                      </h2>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Control Center
                      </h3>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
                    >
                      We&apos;ll load tailored sample data and set up a workspace based on your role and institution size, so you can explore how the platform works in real context.
                    </motion.p>

                    {/* Features List */}
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="space-y-1"
                    >
                      {/* <p className="text-sm font-medium text-foreground mb-3">You&apos;ll get:</p> */}
                      <motion.ul
                        className="space-y-2"
                      >
                        {[
                          "Sample data matched to your institution",
                          "Dashboards personalized to your role",
                          "A guided workspace to understand key workflows",
                        ].map((feature, index) => (
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
                    </motion.div>
                  </>
                )}

                {/* Step 2: Data Collection - One Question at a Time */}
                {isStep2 && !showThankYou && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Question 1: Team Size */}
                      {currentQuestion === 1 && (
                        <>
                          {/* Title */}
                          <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4, delay: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <span className="font-medium">Question 1 of 3</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Users className="h-5 w-5 text-primary" />
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                What&apos;s your Career Center team size?
                              </h2>
                            </div>
                          </motion.div>

                          <div className="space-y-3 pt-2">
                            <div className="grid grid-cols-2 gap-3">
                              {teamSizeOptions.map((option, index) => (
                                <motion.button
                                  key={option.value}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 + index * 0.05 }}
                                  onClick={() => handleQuestionAnswer("teamSize", option.value)}
                                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-[1.02] ${
                                    formData.teamSize === option.value
                                      ? "border-primary bg-primary/5 shadow-md"
                                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                        formData.teamSize === option.value
                                          ? "bg-primary/10"
                                          : "bg-muted"
                                      }`}
                                    >
                                      <option.icon
                                        className={`h-5 w-5 ${
                                          formData.teamSize === option.value
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                        }`}
                                      />
                                    </div>
                                    <span className="text-sm font-medium">{option.label}</span>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                            
                            {/* Other Option */}
                            {!showCustomInput.teamSize ? (
                              <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => handleQuestionAnswer("teamSize", "other")}
                                className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
                              >
                                <span className="text-sm font-medium text-muted-foreground">Other (specify)</span>
                              </motion.button>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-2"
                              >
                                <Input
                                  type="text"
                                  placeholder="Enter your team size..."
                                  value={customInputs.teamSize}
                                  onChange={(e) => setCustomInputs({ ...customInputs, teamSize: e.target.value })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleCustomInputSubmit("teamSize");
                                    }
                                  }}
                                  autoFocus
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleCustomInputSubmit("teamSize")}
                                  disabled={!customInputs.teamSize.trim()}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </>
                      )}

                      {/* Question 2: Student Count */}
                      {currentQuestion === 2 && (
                        <>
                          <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4, delay: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <span className="font-medium">Question 2 of 3</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <GraduationCap className="h-5 w-5 text-primary" />
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                How many students are in your institution?
                              </h2>
                            </div>
                          </motion.div>

                          <div className="space-y-3 pt-2">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {studentCountOptions.map((option, index) => (
                                <motion.button
                                  key={option.value}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 + index * 0.05 }}
                                  onClick={() => handleQuestionAnswer("studentCount", option.value)}
                                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] ${
                                    formData.studentCount === option.value
                                      ? "border-primary bg-primary/5 shadow-md"
                                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                                  }`}
                                >
                                  <span className="text-sm font-medium">{option.label}</span>
                                </motion.button>
                              ))}
                            </div>
                            
                            {/* Other Option */}
                            {!showCustomInput.studentCount ? (
                              <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                onClick={() => handleQuestionAnswer("studentCount", "other")}
                                className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
                              >
                                <span className="text-sm font-medium text-muted-foreground">Other (specify)</span>
                              </motion.button>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-2"
                              >
                                <Input
                                  type="text"
                                  placeholder="Enter student count..."
                                  value={customInputs.studentCount}
                                  onChange={(e) => setCustomInputs({ ...customInputs, studentCount: e.target.value })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleCustomInputSubmit("studentCount");
                                    }
                                  }}
                                  autoFocus
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleCustomInputSubmit("studentCount")}
                                  disabled={!customInputs.studentCount.trim()}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </>
                      )}

                      {/* Question 3: Role */}
                      {currentQuestion === 3 && (
                        <>
                          <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4, delay: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <span className="font-medium">Question 3 of 3</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Briefcase className="h-5 w-5 text-primary" />
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                What&apos;s your role?
                              </h2>
                            </div>
                          </motion.div>

                          <div className="space-y-2 pt-2">
                            {roleOptions.map((option, index) => (
                              <motion.button
                                key={option.value}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                onClick={() => handleQuestionAnswer("role", option.value)}
                                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-[1.01] ${
                                  formData.role === option.value
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                                }`}
                              >
                                <span className="text-sm font-medium">{option.label}</span>
                              </motion.button>
                            ))}
                            
                            {/* Other Option */}
                            {!showCustomInput.role ? (
                              <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={() => handleQuestionAnswer("role", "other")}
                                className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
                              >
                                <span className="text-sm font-medium text-muted-foreground">Other (specify)</span>
                              </motion.button>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-2"
                              >
                                <Input
                                  type="text"
                                  placeholder="Enter your role..."
                                  value={customInputs.role}
                                  onChange={(e) => setCustomInputs({ ...customInputs, role: e.target.value })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleCustomInputSubmit("role");
                                    }
                                  }}
                                  autoFocus
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleCustomInputSubmit("role")}
                                  disabled={!customInputs.role.trim()}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Thank You Message */}
                {isStep2 && showThankYou && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center space-y-6 py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg"
                    >
                      <Rocket className="h-10 w-10 text-primary" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-center space-y-2"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        All Set! 🎉
                      </h2>
                      <p className="text-muted-foreground text-base md:text-lg max-w-md">
                        Your profile has been configured. Let&apos;s get started with your career counseling journey!
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex gap-2"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {!showThankYou && (
              <div className="mt-8 pt-6 flex items-center justify-between border-t border-border/50">
                {/* Back Button */}
                <div className="flex items-center gap-2">
                  {(isStep2 || currentQuestion > 1) && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousQuestion}
                        className="gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Next/Complete Button */}
                <div className="flex items-center gap-2">
                  {isStep1 && (
                    <Button
                      size="sm"
                      onClick={() => paginate(1)}
                      className="gap-1"
                    >
                      Get Started
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/60"
            initial={{ width: "0%" }}
            animate={{ 
              width: currentStep === 1 
                ? "25%" 
                : `${25 + (currentQuestion * 25)}%`
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

