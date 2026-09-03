import { AppSidebar } from "@/components/threadUi/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <main className="w-full">

          {children}
        </main>
    </SidebarProvider>
  );
}
