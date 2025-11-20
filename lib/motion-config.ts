/**
 * Motion configuration and utilities for Framer Motion
 * Handles reduced motion preferences and performance optimization
 */

import { Transition } from "framer-motion";

// Detect if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Default transitions
export const transitions = {
  fast: { duration: 0.15, ease: "easeOut" } as Transition,
  normal: { duration: 0.18, ease: "easeOut" } as Transition,
  slow: { duration: 0.22, ease: "easeOut" } as Transition,
  spring: { type: "spring", damping: 30, stiffness: 300 } as Transition,
  springBouncy: { type: "spring", damping: 20, stiffness: 300 } as Transition,
};

// Get transition with reduced motion support
export const getTransition = (transition: Transition): Transition => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 } as Transition;
  }
  return transition;
};

// Animation configuration for MotionConfig
export const motionConfig = {
  reducedMotion: "user" as const,
  transition: transitions.normal,
};

// Helper to create responsive animations
export const createAnimation = (
  initial: any,
  animate: any,
  exit?: any,
  transition?: Transition
) => {
  if (prefersReducedMotion()) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      ...(exit && { exit: { opacity: 1 } }),
    };
  }

  return {
    initial,
    animate,
    ...(exit && { exit }),
    transition: transition || transitions.normal,
  };
};

