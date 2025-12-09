"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, ArrowRight, FileText, Video } from "lucide-react";
import { motion } from "framer-motion";

export function PendingReviewsCard() {
  return (
    <Card className="rounded-xl py-0 shadow-sm hover:shadow-md transition-all duration-200 border-border/50">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div> */}
            <div>
              <h3 className="text-base font-semibold text-foreground leading-tight">
                Pending Reviews
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Submissions awaiting your review
              </p>
            </div>
          </div>
          <div className="flex h-8 min-w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold px-2.5 shrink-0">
            7
          </div>
        </div>

        {/* Stats - Horizontal Layout */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500/10 shrink-0">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground leading-none">5</p>
              <p className="text-xs text-muted-foreground mt-0.5">Resumes</p>
            </div>
          </div>
          
          <div className="h-9 w-px bg-border" />
          
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-purple-500/10 shrink-0">
              <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground leading-none">2</p>
              <p className="text-xs text-muted-foreground mt-0.5">Interviews</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link href="/student-submissions" className="block">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button className="w-full gap-2 h-9 text-sm font-medium" size="default">
              Start Reviewing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </Link>
      </CardContent>
    </Card>
  );
}

