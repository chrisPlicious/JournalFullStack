import AppSidebar from "@/components/layouts/side-bar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Entry() {
  return(
    <SidebarProvider className="border-r dark:border-slate-800">
        <AppSidebar />
    </SidebarProvider>
  );
}