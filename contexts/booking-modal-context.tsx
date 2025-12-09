"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BookingDemoModal } from "@/components/booking-demo-modal";
import { BookingContextType } from "@/lib/booking-contexts";

interface BookingModalContextType {
  openBookingModal: (contextType: BookingContextType) => void;
  closeBookingModal: () => void;
  isOpen: boolean;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(
  undefined
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contextType, setContextType] = useState<BookingContextType>("generic");

  const openBookingModal = (type: BookingContextType) => {
    setContextType(type);
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
    // Reset state after animation completes
    setTimeout(() => {
      setContextType("generic");
    }, 200);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeBookingModal();
    } else {
      setIsOpen(open);
    }
  };

  return (
    <BookingModalContext.Provider
      value={{
        openBookingModal,
        closeBookingModal,
        isOpen,
      }}
    >
      {children}
      <BookingDemoModal
        open={isOpen}
        onOpenChange={handleOpenChange}
        contextType={contextType}
      />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}

