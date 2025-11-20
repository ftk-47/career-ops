"use client";

import { motion } from "framer-motion";
import { animationVariants, getAnimation } from "@/lib/animation-variants";
import { ReactNode, HTMLAttributes } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "div" | "tbody";
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "tr";
}

/**
 * Container for staggered animations
 * Use with StaggerItem children for table rows, cards, etc.
 */
export function StaggerContainer({ 
  children, 
  className,
  delay = 0.05,
  staggerDelay = 0.03,
  as = "div",
}: StaggerContainerProps) {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const Component = motion[as];

  return (
    <Component
      initial="hidden"
      animate="show"
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}

/**
 * Individual item in a stagger animation
 * Fades in with slight upward motion
 */
export function StaggerItem({ 
  children, 
  className,
  as = "div",
}: StaggerItemProps) {
  const variants = getAnimation(animationVariants.tableStagger.row);
  const Component = motion[as];

  return (
    <Component
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}

/**
 * Specialized version for table rows
 */
export function StaggerTableRow({ children, className, ...props }: StaggerItemProps) {
  const variants = getAnimation(animationVariants.tableStagger.row);

  return (
    <motion.tr
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.tr>
  );
}

