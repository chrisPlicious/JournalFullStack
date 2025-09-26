import { NavLink } from "react-router-dom";
import { Home, List, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const items = [
    { title: "Home", to: "/home", icon: Home },
    { title: "All Entries", to: "/entries", icon: List },
    { title: "Add Entry", to: "/add-entry", icon: Plus },
  ];

  return (
    <Sidebar className="border-r dark:border-slate-800 bg-black">
      <SidebarContent className="bg-black">
        {/* Header */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel>
            <div className="flex items-center gap-3 px-3 mt-9">
              <div className="rounded-full bg-white p-2 text-black font-bold text-2xl">
                J
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-white">Journal</h1>
                <p className="text-1xl text-white">
                  My entries & notes
                </p>
              </div>
            </div>
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors duration-150 hover-bg-white ` +
                        (isActive
                          ? "bg-black text-white font-medium" // Active: black bg + white text/icons
                          : "bg-white text-black")
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
