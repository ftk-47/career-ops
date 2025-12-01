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
    title: "Add Students to Your Portfolio",
    description: (
      <>
        <p>Adding real students is part of your full workspace activation.</p>
        <p>Book a quick demo and we&apos;ll guide you through setting up student portfolios, based on what&apos;s worked across 200+ career centers.</p>
        <p className="font-medium mt-3 mb-2">You&apos;ll learn:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>How student profiles and progress are tracked</li>
          <li>Portfolio workflows used by top institutions</li>
          <li>How to onboard students seamlessly</li>
        </ul>
      </>
    ),
    feature: "Student Portfolio Management",
  },
  "create-cohort": {
    title: "Create and Manage Cohorts",
    description: (
      <>
        <p>Creating cohorts and organizing students is part of your full workspace activation.</p>
        <p>Book a quick demo and we&apos;ll guide you through cohort setup, informed by what&apos;s worked across 200+ career centers.</p>
        <p className="font-medium mt-3 mb-2">You&apos;ll learn:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>How to structure cohorts effectively</li>
          <li>Ways top centers segment students</li>
          <li>Best practices for tracking progress at scale</li>
        </ul>
      </>
    ),
    feature: "Cohort Management",
  },
  "invite-member": {
    title: "Invite Team Members",
    description: (
      <>
        <p>Inviting team members is part of the full workspace setup.</p>
        <p>Book a quick demo and we&apos;ll walk you through team onboarding.</p>
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
    title: "Create Mock Interviews",
    description: (
      <>
        <p>This feature is part of your full workspace setup.</p>
        <p>Book a quick demo and we&apos;ll help you activate interview management based on what&apos;s worked for 200+ career centers.</p>
        <p className="font-medium mt-3 mb-2">What you&apos;ll see:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>How mock interviews are set up</li>
          <li>Best practices for tracking student performance</li>
          <li>Your complete AI-powered interview workflow</li>
        </ul>
      </>
    ),
    feature: "Interview Management",
  },
  "start-review": {
    title: "Start Reviewing Submissions",
    description: (
      <>
        <p>Submission reviews are enabled during full workspace onboarding.</p>
        <p>Join a quick demo to see how our AI-supported review system is used by top career centers.</p>
        <p className="font-medium mt-3 mb-2">Covers:</p>
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

