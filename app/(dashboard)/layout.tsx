import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ModeProvider } from "@/contexts/mode-context";
import { BookingModalProvider } from "@/contexts/booking-modal-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModeProvider>
      <BookingModalProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />
            <SidebarInset className="bg-muted/20">
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BookingModalProvider>
    </ModeProvider>
  );
}

