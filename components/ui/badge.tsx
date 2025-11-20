"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border-0 px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary [a&]:hover:bg-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive [a&]:hover:bg-destructive/20",
        outline:
          "border border-border text-foreground [a&]:hover:bg-accent",
        success:
          "bg-success/10 text-success [a&]:hover:bg-success/20",
        warning:
          "bg-warning/10 text-warning [a&]:hover:bg-warning/20",
        error:
          "bg-error/10 text-error [a&]:hover:bg-error/20",
        info:
          "bg-info/10 text-info [a&]:hover:bg-info/20",
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
