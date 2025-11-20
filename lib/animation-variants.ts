/**
 * Centralized animation variants for consistent animations throughout the app
 * Respects prefers-reduced-motion for accessibility
 */

const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const animationVariants = {
  // Page transition variants
  pageTransition: {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.18, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  },

  // First load animation (fade + scale)
  firstLoad: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.22, ease: "easeOut" }
    }
  },

  // Table stagger animations
  tableStagger: {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
          delayChildren: 0.05
        }
      }
    },
    row: {
      hidden: { opacity: 0, y: 6 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.15, ease: "easeOut" }
      }
    }
  },

  // Card fade in with upward motion
  cardFade: (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.18, 
        ease: "easeOut",
        delay 
      }
    }
  }),

  // Simple fade in
  fadeIn: (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.15, 
        ease: "easeOut",
        delay 
      }
    }
  }),

  // Slide in from direction
  slideIn: (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay = 0) => {
    const offset = 20;
    const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
    const value = direction === 'down' || direction === 'right' ? offset : -offset;
    
    return {
      initial: { opacity: 0, [axis]: value },
      animate: { 
        opacity: 1, 
        [axis]: 0,
        transition: { 
          duration: 0.18, 
          ease: "easeOut",
          delay 
        }
      }
    };
  },

  // Dialog/Modal animations
  dialogOverlay: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.15, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  },

  dialogContent: {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  },

  // Sheet animations
  sheetOverlay: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.15, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  },

  sheetContent: (side: 'top' | 'right' | 'bottom' | 'left' = 'right') => {
    const variants: Record<string, any> = {
      right: { x: '100%' },
      left: { x: '-100%' },
      top: { y: '-100%' },
      bottom: { y: '100%' }
    };

    return {
      initial: variants[side],
      animate: { 
        x: 0,
        y: 0,
        transition: { 
          type: "spring", 
          damping: 30, 
          stiffness: 300 
        }
      },
      exit: variants[side]
    };
  },

  // Dropdown menu animations
  dropdownMenu: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.15, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeIn" }
    }
  },

  // Badge scale animation
  badgeMount: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.12, ease: "easeOut" }
    }
  }
};

// Hover/tap interactions
export const hoverTap = {
  // Button hover/tap
  button: {
    whileHover: { scale: 1.01 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15, ease: "easeOut" }
  },

  // Card hover
  card: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.15, ease: "easeOut" }
  },

  // Sidebar item hover
  sidebarItem: {
    whileHover: { scale: 1.02, x: 2 },
    transition: { duration: 0.15, ease: "easeOut" }
  },

  // Icon rotate
  iconRotate: (isOpen: boolean) => ({
    rotate: isOpen ? 180 : 0,
    transition: { duration: 0.2, ease: "easeOut" }
  })
};

// Get animation with reduced motion support
export const getAnimation = (variant: any) => {
  if (shouldReduceMotion()) {
    // Return instant transitions for reduced motion
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 }
    };
  }
  return variant;
};

