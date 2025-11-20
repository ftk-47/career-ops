"use client";

import { motion } from "framer-motion";
import { animationVariants, getAnimation } from "@/lib/animation-variants";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  tap?: boolean;
}

/**
 * Card wrapper with fade + upward motion and optional hover scale
 * Perfect for dashboard metric cards and other card-based UIs
 */
export function AnimatedCard({ 
  children, 
  className,
  delay = 0,
  hover = true,
  tap = false,
}: AnimatedCardProps) {
  const variants = getAnimation(animationVariants.cardFade(delay));
  
  const hoverProps = hover ? {
    whileHover: { scale: 1.02 },
  } : {};

  const tapProps = tap ? {
    whileTap: { scale: 0.98 },
  } : {};

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(className)}
      {...hoverProps}
      {...tapProps}
    >
      {children}
    </motion.div>
  );
}

