"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  style,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const progressBg = (style as any)?.[`--progress-background`];
  
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      style={{
        backgroundColor: progressBg ? `color-mix(in srgb, ${progressBg} 20%, transparent)` : 'hsl(var(--primary) / 0.2)',
        ...style,
      }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all"
        style={{ 
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: progressBg || 'hsl(var(--primary))',
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
