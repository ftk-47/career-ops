"use client";

import { useState } from "react";
import { PopupModal } from "react-calendly";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { bookingContexts, BookingContextType } from "@/lib/booking-contexts";

interface BookingDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contextType: BookingContextType;
}

export function BookingDemoModal({
  open,
  onOpenChange,
  contextType,
}: BookingDemoModalProps) {
  const context = bookingContexts[contextType] || bookingContexts.generic;
  
  // Calendly modal state
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement] = useState<HTMLElement | null>(
    typeof window !== 'undefined' ? document.body : null
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogTitle>
            {context.title}
          </DialogTitle>

          <div className="space-y-4 py-4">
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              {context.description}
            </div>
            
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-medium mb-1">Feature Access:</p>
              <p className="text-sm text-muted-foreground">{context.feature}</p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                onClick={() => {
                  setIsCalendlyOpen(true);
                  onOpenChange(false);
                }}
                className="w-full"
                size="lg"
              >
                Book a Demo
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calendly Modal */}
      {rootElement && (
        <PopupModal
          url="https://calendly.com/explore-hiration-s-career-suite/hiration-demo-in"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={rootElement}
        />
      )}
    </>
  );
}

