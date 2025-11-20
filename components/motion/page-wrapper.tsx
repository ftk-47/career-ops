"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { animationVariants, getAnimation } from "@/lib/animation-variants";
import { ReactNode, useEffect, useState } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page wrapper that handles both first-load and route transition animations
 * Shows first-load animation on page refresh, page transition on route changes
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  const pathname = usePathname();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // After first render, disable first-load animation
    const timer = setTimeout(() => setIsFirstLoad(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const variants = isFirstLoad 
    ? getAnimation(animationVariants.firstLoad)
    : getAnimation(animationVariants.pageTransition);

  return (
    <motion.div
      key={pathname}
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

