import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Hiration Counsellor",
  description: "Create your counsellor account to help students succeed",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      {children}
    </div>
  );
}
