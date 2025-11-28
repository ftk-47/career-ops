"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function PendingReviewsCard() {
  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Pending Reviews</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Submissions awaiting your review
              </p>
            </div>
          </div>
          <Badge variant="default" className="h-8 px-3 text-base font-bold">
            5
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center justify-center p-3 rounded-lg border bg-card">
            <p className="text-2xl font-bold text-primary">4</p>
            <p className="text-xs text-muted-foreground">Resumes</p>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-lg border bg-card">
            <p className="text-2xl font-bold text-primary">1</p>
            <p className="text-xs text-muted-foreground">Interview</p>
          </div>
        </div>

        <Link href="/student-submissions" className="block">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button className="w-full gap-2 h-10" size="lg">
              Start Reviewing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </Link>
      </CardContent>
    </Card>
  );
}

