"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  Shield,
  Lock,
  Mail,
  Building2,
  Sparkles,
  Star,
  Quote,
  ChevronLeft,
  FileCheck,
  Globe,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

type Step = "credentials" | "otp" | "success";

// Pre-generated particle positions (avoiding Math.random during render)
const PARTICLES = [
  { x: "15%", y: "20%", duration: 5, delay: 0.5 },
  { x: "80%", y: "15%", duration: 6, delay: 1.2 },
  { x: "25%", y: "70%", duration: 4.5, delay: 2.1 },
  { x: "65%", y: "85%", duration: 5.5, delay: 0.8 },
  { x: "90%", y: "45%", duration: 6.5, delay: 1.8 },
  { x: "10%", y: "55%", duration: 5, delay: 3 },
  { x: "45%", y: "10%", duration: 4, delay: 0.3 },
  { x: "70%", y: "60%", duration: 7, delay: 2.5 },
];

// Trust badges data
const TRUST_BADGES = [
  { icon: Shield, label: "FERPA" },
  { icon: ShieldCheck, label: "SOC 2" },
  { icon: FileCheck, label: "VPAT" },
  { icon: Globe, label: "GDPR" },
] as const;

// Testimonials data
const testimonials = [
  {
    quote: "Hiration has completely transformed our career services. We've seen a 40% increase in student placement rates.",
    author: "Dr. Sarah Mitchell",
    role: "Director of Career Services",
    university: "Stanford University",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "The AI-powered resume reviews save our counselors 15+ hours every week. It's a game-changer.",
    author: "Prof. James Chen",
    role: "Career Center Lead",
    university: "MIT",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "Our students love the personalized career guidance. The platform is intuitive and powerful.",
    author: "Dr. Emily Rodriguez",
    role: "Associate Dean",
    university: "UC Berkeley",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

// Animated grid background
function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/95 to-primary/85" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-white/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-white/15 rounded-full blur-[120px]"
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating particles with pre-generated positions */}
      {PARTICLES.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{ left: particle.x, top: particle.y }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Testimonial carousel card
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl"
    >
      {/* Quote icon and stars row */}
      <div className="flex items-center justify-between mb-3">
        <Quote className="size-6 text-white/40" />
        <div className="flex gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      
      {/* Quote text */}
      <p className="text-white/90 text-base leading-relaxed mb-4 font-light">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <Image
            src={testimonial.image}
            alt={testimonial.author}
            width={44}
            height={44}
            className="rounded-full object-cover ring-2 ring-white/30"
          />
          <div className="absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full border-2 border-white/80 flex items-center justify-center">
            <CheckCircle2 className="size-2.5 text-white" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-white font-semibold text-sm truncate">{testimonial.author}</div>
          <div className="text-white/60 text-xs truncate">{testimonial.role}</div>
          <div className="text-white/40 text-xs truncate">{testimonial.university}</div>
        </div>
      </div>
    </motion.div>
  );
}

// Stats component
function StatsBar() {
  const stats = [
    { value: "50K+", label: "Students" },
    { value: "1,200+", label: "Universities" },
    { value: "95%", label: "Success" },
    { value: "4.9/5", label: "Rating" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className="text-center"
        >
          <div className="text-xl font-bold text-white">{stat.value}</div>
          <div className="text-[10px] text-white/60 uppercase tracking-wider">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// Form input with icon
function FormInput({
  icon: Icon,
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: typeof Mail;
  label: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground/80">{label}</Label>
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          <Icon className="size-[18px]" />
        </div>
        <Input
          className={cn(
            "h-11 pl-10 pr-4 text-sm bg-background/50 border-border/50 rounded-lg",
            "focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-all duration-200",
            error && "border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive flex items-center gap-1"
        >
          <span className="size-1 rounded-full bg-destructive" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    institution: "",
  });

  // Form validation
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    institution: "",
  });

  // Derived state for canResend
  const canResend = resendTimer === 0;

  // Rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Resend timer countdown
  useEffect(() => {
    if (step === "otp" && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, resendTimer]);

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = { email: "", password: "", institution: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.institution) {
      newErrors.institution = "Institution name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  // Handle credentials form submission
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("otp");
    setResendTimer(30);
  };

  // Handle OTP verification
  const handleOtpSubmit = useCallback(async () => {
    if (otpValue.length !== 6 || isLoading) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("success");
    setTimeout(() => router.push("/"), 3000);
  }, [otpValue, isLoading, router]);

  // Handle resend OTP
  const handleResendOtp = () => {
    setResendTimer(30);
    setOtpValue("");
  };

  // Handle OTP change and auto-submit
  const handleOtpChange = useCallback((value: string) => {
    setOtpValue(value);
    if (value.length === 6) {
      // Use setTimeout to avoid calling setState during render
      setTimeout(() => {
        handleOtpSubmit();
      }, 0);
    }
  }, [handleOtpSubmit]);

  // Memoize current testimonial
  const currentTestimonial = useMemo(() => testimonials[activeTestimonial], [activeTestimonial]);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-[55%] xl:w-[55%] relative"
      >
        <AnimatedGridBackground />

        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=900&fit=crop"
            alt="Students in career counseling session"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-black/60 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-8 xl:p-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Hiration</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1] mb-4 tracking-tight">
              Transform Your
              <br />
              <span className="text-white/90">Career Center</span>
            </h1>
            <p className="text-base xl:text-lg text-white/70 max-w-md leading-relaxed mb-6">
              Join 1,200+ universities using AI-powered tools to guide students toward their dream careers.
            </p>

            {/* Stats */}
            <StatsBar />
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-sm"
          >
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={activeTestimonial}
                testimonial={currentTestimonial}
              />
            </AnimatePresence>

            {/* Testimonial indicators */}
            <div className="flex gap-1.5 mt-3 justify-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === activeTestimonial ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* Trust text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/50 text-xs"
          >
            Trusted by career centers at Harvard, Stanford, MIT, and 1,200+ institutions worldwide
          </motion.p>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[45%] xl:w-[45%] flex flex-col bg-background overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden p-4 bg-primary shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Hiration</span>
          </div>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8 xl:p-10 overflow-y-auto">
          <div className="w-full max-w-[380px]">
            <AnimatePresence mode="wait">
              {/* Credentials Step */}
              {step === "credentials" && (
                <motion.div
                  key="credentials"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3"
                    >
                      <Sparkles className="size-3" />
                      Free 14-day trial
                    </motion.div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">
                      Create your account
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Start empowering student careers in minutes
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <FormInput
                        icon={Mail}
                        label="Work Email"
                        type="email"
                        placeholder="you@university.edu"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        error={errors.email}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground/80">Password</Label>
                        <div className="relative group">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                            <Lock className="size-[18px]" />
                          </div>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => {
                              setFormData({ ...formData, password: e.target.value });
                              if (errors.password) setErrors({ ...errors, password: "" });
                            }}
                            className={cn(
                              "h-11 pl-10 pr-10 text-sm bg-background/50 border-border/50 rounded-lg",
                              "focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20",
                              "transition-all duration-200",
                              errors.password && "border-destructive"
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                        {errors.password ? (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-destructive flex items-center gap-1"
                          >
                            <span className="size-1 rounded-full bg-destructive" />
                            {errors.password}
                          </motion.p>
                        ) : (
                          <p className="text-[11px] text-muted-foreground">
                            Minimum 8 characters
                          </p>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <FormInput
                        icon={Building2}
                        label="University / Institution"
                        type="text"
                        placeholder="e.g., Stanford University"
                        value={formData.institution}
                        onChange={(e) => {
                          setFormData({ ...formData, institution: e.target.value });
                          if (errors.institution) setErrors({ ...errors, institution: "" });
                        }}
                        error={errors.institution}
                      />
                    </motion.div>

                    {/* Submit button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="pt-1"
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full h-11 text-sm font-semibold rounded-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="size-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="size-4 ml-1.5" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col items-center gap-2 pt-3"
                    >
                      <p className="text-[11px] text-muted-foreground/70 font-medium">
                        Certified & Compliant
                      </p>
                      <div className="flex items-center justify-center gap-4 text-muted-foreground">
                        {TRUST_BADGES.map((badge) => (
                          <span key={badge.label} className="text-[10px]">
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="relative py-3"
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border/50" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-background px-3 text-xs text-muted-foreground">
                          Already have an account?
                        </span>
                      </div>
                    </motion.div>

                    {/* Sign in link */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 text-sm rounded-lg border-border/50 hover:bg-accent"
                      >
                        Sign in to existing account
                      </Button>
                    </motion.div>
                  </form>

                  {/* Footer */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-[10px] text-muted-foreground mt-4"
                  >
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Terms</a>
                    {" "}and{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </motion.p>
                </motion.div>
              )}

              {/* OTP Step */}
              {step === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {/* Back button */}
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => {
                      setStep("credentials");
                      setOtpValue("");
                    }}
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-6"
                  >
                    <ChevronLeft className="size-4" />
                    <span className="text-sm">Back</span>
                  </motion.button>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="mx-auto mb-5 size-16 rounded-2xl bg-primary/10 flex items-center justify-center"
                  >
                    <Mail className="size-8 text-primary" />
                  </motion.div>

                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h2 className="text-xl font-bold mb-1.5">Check your email</h2>
                    <p className="text-muted-foreground text-sm">
                      We sent a code to{" "}
                      <span className="font-medium text-foreground">{formData.email}</span>
                    </p>
                  </motion.div>

                  {/* OTP Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-6"
                  >
                    <InputOTP
                      maxLength={6}
                      value={otpValue}
                      onChange={handleOtpChange}
                      disabled={isLoading}
                    >
                      <InputOTPGroup className="gap-1.5">
                        <InputOTPSlot index={0} className="size-11 text-lg rounded-lg border-border/50" />
                        <InputOTPSlot index={1} className="size-11 text-lg rounded-lg border-border/50" />
                        <InputOTPSlot index={2} className="size-11 text-lg rounded-lg border-border/50" />
                      </InputOTPGroup>
                      <InputOTPSeparator className="text-muted-foreground mx-1" />
                      <InputOTPGroup className="gap-1.5">
                        <InputOTPSlot index={3} className="size-11 text-lg rounded-lg border-border/50" />
                        <InputOTPSlot index={4} className="size-11 text-lg rounded-lg border-border/50" />
                        <InputOTPSlot index={5} className="size-11 text-lg rounded-lg border-border/50" />
                      </InputOTPGroup>
                    </InputOTP>
                  </motion.div>

                  {/* Loading state */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-muted-foreground mb-6"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="size-4 border-2 border-primary/30 border-t-primary rounded-full"
                      />
                      <span className="text-sm">Verifying...</span>
                    </motion.div>
                  )}

                  {/* Resend */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {canResend ? (
                      <button
                        onClick={handleResendOtp}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Resend code
                      </button>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Resend in{" "}
                        <span className="font-semibold text-foreground tabular-nums">
                          {resendTimer}s
                        </span>
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {/* Success Step */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8"
                >
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative mx-auto mb-6"
                  >
                    <div className="size-20 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl shadow-green-500/30">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle2 className="size-10 text-white" />
                      </motion.div>
                    </div>
                    {/* Celebration particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: Math.cos((i * Math.PI) / 4) * 50,
                          y: Math.sin((i * Math.PI) / 4) * 50,
                        }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 size-2 rounded-full bg-primary"
                        style={{ marginLeft: -4, marginTop: -4 }}
                      />
                    ))}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold mb-2"
                  >
                    Welcome aboard!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground mb-6"
                  >
                    Your account has been created successfully.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 text-muted-foreground text-sm"
                  >
                    <span>Redirecting to dashboard</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="size-1.5 rounded-full bg-primary"
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
