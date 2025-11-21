import type { Metadata } from "next";
import {
  Poppins,
  Libre_Baskerville,
  IBM_Plex_Mono,
  Inter,
  Source_Serif_4,
  JetBrains_Mono,
  Montserrat,
  Space_Grotesk,
  DM_Sans,
  Nunito,
  Orbitron,
  Lato,
  Playfair_Display,
  Merriweather,
  Lora,
  Cormorant,
  Fira_Code,
  Source_Code_Pro,
  Courier_Prime,
  Crimson_Pro
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

// Pastel Style Fonts
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

// Stripy & Crimson Theme Fonts
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Ocean & Midnight Theme Fonts
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Forest & Rose Theme Fonts
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Sunset Theme Fonts
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Cyberpunk Theme Fonts
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Noir Theme Fonts
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

// Serif Fonts
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Monospace Fonts
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
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
          ${montserrat.variable}
          ${spaceGrotesk.variable}
          ${dmSans.variable}
          ${nunito.variable}
          ${orbitron.variable}
          ${lato.variable}
          ${playfairDisplay.variable}
          ${merriweather.variable}
          ${lora.variable}
          ${cormorant.variable}
          ${crimsonPro.variable}
          ${firaCode.variable}
          ${sourceCodePro.variable}
          ${courierPrime.variable}
          antialiased
        `}
      >
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