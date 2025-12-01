import { ReactNode } from "react";

export type BookingContextType =
  | "add-student"
  | "create-cohort"
  | "invite-member"
  | "create-interview"
  | "start-review"
  | "generic";

export interface BookingContext {
  title: string;
  description: ReactNode;
  feature: string;
}

export const bookingContexts: Record<BookingContextType, BookingContext> = {
  "add-student": {
    title: "Student Portfolio Requires Setup",
    description: (
      <>
        <p>Adding students and managing portfolios is part of your full workspace setup.
        Book a quick demo and we&apos;ll help you activate student management.</p>
        <p className="font-medium mt-3 mb-2">What&apos;s included:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Student portfolio setup</li>
          <li>Profile completion tracking</li>
          <li>Progress monitoring</li>
        </ul>
      </>
    ),
    feature: "Student Portfolio Management",
  },
  "create-cohort": {
    title: "Cohort Management Requires Setup",
    description: (
      <>
        <p>Creating cohorts is part of the full workspace setup.
        Book a quick demo and we&apos;ll guide you through cohort organization.</p>
        <p className="font-medium mt-3 mb-2">What&apos;s included:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cohort creation</li>
          <li>Group-based tracking</li>
          <li>Engagement insights</li>
        </ul>
      </>
    ),
    feature: "Cohort Management",
  },
  "invite-member": {
    title: "Team Collaboration Requires Setup",
    description: (
      <>
        <p>Inviting team members is part of the full workspace setup.
        Book a quick demo and we&apos;ll walk you through team onboarding.</p>
        <p className="font-medium mt-3 mb-2">What&apos;s included:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Shared reviewer workspace</li>
          <li>Workload distribution</li>
          <li>Role-based permissions</li>
        </ul>
      </>
    ),
    feature: "Team Collaboration",
  },
  "create-interview": {
    title: "Interview Management Requires Setup",
    description: (
      <>
        <p>Mock interviews are available as part of your full workspace setup.
        Book a quick demo and we&apos;ll show you the interview workflow.</p>
        <p className="font-medium mt-3 mb-2">What&apos;s included:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Interview templates</li>
          <li>Performance tracking</li>
          <li>AI-powered insights</li>
        </ul>
      </>
    ),
    feature: "Interview Management",
  },
  "start-review": {
    title: "Review System Requires Setup",
    description: (
      <>
        <p>Reviewing student submissions is part of your full workspace setup.
        Book a quick demo and we&apos;ll walk you through the complete review workflow.</p>
        <p className="font-medium mt-3 mb-2">What&apos;s included:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Review routing</li>
          <li>Feedback workflows</li>
          <li>Reviewer collaboration</li>
        </ul>
      </>
    ),
    feature: "Review System",
  },
  generic: {
    title: "Unlock Full Access",
    description: (
      <p>To access all features and unlock the complete platform experience, book a demo with our team.</p>
    ),
    feature: "Full Platform Access",
  },
};

