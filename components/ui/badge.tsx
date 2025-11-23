"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border-0 px-2.5 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary/15 text-primary dark:bg-primary/25 dark:text-primary [a&]:hover:bg-primary/25 dark:[a&]:hover:bg-primary/35",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/15 text-destructive dark:bg-destructive/25 dark:text-destructive [a&]:hover:bg-destructive/25 dark:[a&]:hover:bg-destructive/35",
        outline:
          "border border-border text-foreground [a&]:hover:bg-accent",
        success:
          "bg-success/15 text-success dark:bg-success/25 dark:text-success [a&]:hover:bg-success/25 dark:[a&]:hover:bg-success/35",
        warning:
          "bg-warning/15 text-warning dark:bg-warning/25 dark:text-warning [a&]:hover:bg-warning/25 dark:[a&]:hover:bg-warning/35",
        error:
          "bg-error/15 text-error dark:bg-error/25 dark:text-error [a&]:hover:bg-error/25 dark:[a&]:hover:bg-error/35",
        info:
          "bg-info/15 text-info dark:bg-info/25 dark:text-info [a&]:hover:bg-info/25 dark:[a&]:hover:bg-info/35",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  if (asChild) {
    const Comp = Slot
    return (
      <Comp
        data-slot="badge"
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }

  return (
    <motion.span
      data-slot="badge"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className={cn(badgeVariants({ variant }), className)}
    >
      {children}
    </motion.span>
  )
}

export { Badge, badgeVariants }
