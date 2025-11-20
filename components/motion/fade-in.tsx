"use client";

import { motion } from "framer-motion";
import { animationVariants, getAnimation } from "@/lib/animation-variants";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

/**
 * Simple fade-in wrapper with optional slide direction
 * Configurable duration and delay for flexible animations
 */
export function FadeIn({ 
  children, 
  className,
  delay = 0,
  direction = 'none',
}: FadeInProps) {
  const variants = direction === 'none' 
    ? getAnimation(animationVariants.fadeIn(delay))
    : getAnimation(animationVariants.slideIn(direction, delay));

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

