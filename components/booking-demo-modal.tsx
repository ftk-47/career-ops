"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, Check, ChevronLeft, Clock } from "lucide-react";
import { bookingContexts, BookingContextType } from "@/lib/booking-contexts";

interface BookingDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contextType: BookingContextType;
  currentStep: number;
  onStepChange: (step: number) => void;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  onTimeChange: (time: string | undefined) => void;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const stepVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function BookingDemoModal({
  open,
  onOpenChange,
  contextType,
  currentStep,
  onStepChange,
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
}: BookingDemoModalProps) {
  const context = bookingContexts[contextType] || bookingContexts.generic;

  const getDialogTitle = () => {
    switch (currentStep) {
      case 1:
        return context.title;
      case 2:
        return "Select a Date";
      case 3:
        return "Select a Time";
      case 4:
        return "Booking Confirmed!";
      default:
        return "Book a Demo";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className={currentStep === 4 ? "text-center text-xl" : ""}>
          {getDialogTitle()}
        </DialogTitle>

        <AnimatePresence mode="wait">
          {/* Step 1: Introduction */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-4 py-4"
            >
              <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                {context.description}
              </div>
              
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-medium mb-1">Feature Access:</p>
                <p className="text-sm text-muted-foreground">{context.feature}</p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  onClick={() => onStepChange(2)}
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
            </motion.div>
          )}

          {/* Step 2: Calendar Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-muted-foreground mt-2 mb-2">
                Select a date to book your consultation
              </p>
              <div className="flex flex-col items-center gap-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    onDateChange(date);
                    if (date) {
                      onStepChange(3);
                    }
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="rounded-md border"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && selectedDate && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-muted-foreground mt-2">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="grid grid-cols-3 gap-2 py-4">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => onTimeChange(time)}
                    className="w-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => onStepChange(2)}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => onStepChange(4)}
                  className="flex-1"
                  disabled={!selectedTime}
                >
                  Confirm Booking
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && selectedDate && selectedTime && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4 py-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Your demo has been successfully scheduled. We&apos;ll send you a confirmation email shortly.
              </p>
              <div className="rounded-lg border p-4 space-y-3 bg-muted/30 w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedTime}</span>
                </div>
              </div>
              <Button onClick={() => onOpenChange(false)} className="w-full">
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

