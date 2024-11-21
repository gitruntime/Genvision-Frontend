import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-[100%]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
