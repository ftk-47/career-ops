import type { Metadata } from "next";
import { 
  Poppins, 
  Libre_Baskerville, 
  IBM_Plex_Mono,
  Inter,
  Source_Serif_4,
  JetBrains_Mono,
  Figtree
} from "next/font/google";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PageWrapper } from "@/components/motion/page-wrapper";

import "./globals.css";

// Autumn Style Fonts
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Lavender Style Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// New Themes Fonts (Ocean, Forest, Crimson, Sunset, Midnight, Rose, Cyberpunk, Noir)
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
      </head>
      <body
        className={`
          ${poppins.variable} 
          ${libreBaskerville.variable} 
          ${ibmPlexMono.variable}
          ${inter.variable}
          ${sourceSerif4.variable}
          ${jetBrainsMono.variable}
          ${figtree.variable}
          antialiased
        `}
      >
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />
            <SidebarInset className="bg-muted/20">
              <PageWrapper>{children}</PageWrapper>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
//test commit 