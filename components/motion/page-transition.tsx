"use client";

import { motion, AnimatePresence } from "framer-motion";
import { animationVariants, getAnimation } from "@/lib/animation-variants";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page transition wrapper with fade + upward motion
 * Used for route transitions in App Router
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const variants = getAnimation(animationVariants.pageTransition);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatePresence wrapper for page transitions
 * Use this in layouts to enable exit animations
 */
export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {children}
    </AnimatePresence>
  );
}

