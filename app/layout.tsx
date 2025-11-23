import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hiration Counsellor Admin",
  description: "Admin dashboard for university career counsellors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                const style = localStorage.getItem('style') || 'autumn';
                
                // Apply style class
                document.documentElement.classList.add('style-' + style);
                
                // Apply theme class
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />
            <SidebarInset className="bg-muted/20">
              {/* <PageWrapper> */}
              {children}
              {/* </PageWrapper> */}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
//test commit 