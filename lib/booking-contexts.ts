export type BookingContextType =
  | "add-student"
  | "create-cohort"
  | "invite-member"
  | "create-interview"
  | "start-review"
  | "generic";

export interface BookingContext {
  title: string;
  description: string;
  feature: string;
}

export const bookingContexts: Record<BookingContextType, BookingContext> = {
  "add-student": {
    title: "Add Students to Your Portfolio",
    description:
      "To add students and build comprehensive career portfolios, book a demo to get full access to our student management system.",
    feature: "Student Portfolio Management",
  },
  "create-cohort": {
    title: "Create and Manage Cohorts",
    description:
      "To create cohorts and organize your students effectively, book a demo to unlock our complete cohort management features.",
    feature: "Cohort Management",
  },
  "invite-member": {
    title: "Invite Team Members",
    description:
      "To invite team members and collaborate with other reviewers, book a demo to access our full team collaboration features.",
    feature: "Team Collaboration",
  },
  "create-interview": {
    title: "Create Mock Interviews",
    description:
      "To create interview templates and track student performance, book a demo to explore our AI-powered interview system.",
    feature: "Interview Management",
  },
  "start-review": {
    title: "Start Reviewing Submissions",
    description:
      "To review student submissions and provide detailed feedback, book a demo to access our complete review workflow.",
    feature: "Review System",
  },
  generic: {
    title: "Unlock Full Access",
    description:
      "To access all features and unlock the complete platform experience, book a demo with our team.",
    feature: "Full Platform Access",
  },
};

