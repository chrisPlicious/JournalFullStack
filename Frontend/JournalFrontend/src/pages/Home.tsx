import AppSidebar from "@/components/layouts/side-bar";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider className="flex min-h-screen">
      <AppSidebar />
      <div className="p-10 flex flex-1 flex-col gap-10 items-center justify-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center ">
            <Card className="h-150 flex items-center justify-center text-2xl font-bold">
              Welcome to Journal App
            </Card>
            <Card className="h-150 flex items-center justify-center text-2xl font-bold px-10">
              Create and manage your journal entries
            </Card>
            <Card className="h-150 flex items-center justify-center text-2xl font-bold">
              Stay organized and inspired
            </Card>
          </div>
      </div>
    </SidebarProvider>
  );
}
