import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

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
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
