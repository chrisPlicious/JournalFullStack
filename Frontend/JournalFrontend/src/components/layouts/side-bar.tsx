import { NavLink, useNavigate } from "react-router-dom";
import { Home, List, Plus, LogOut } from "lucide-react";
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
import { logout } from "@/services/authApi";

export default function AppSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const items = [
    { title: "Home", to: "/home", icon: Home },
    { title: "All Entries", to: "/entries", icon: List },
    { title: "Add Entry", to: "/add-entry", icon: Plus },
  ];

  return (
    <Sidebar className="border-r dark:border-slate-800 border-black">
      <SidebarContent className="bg-zinc-800">
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
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors duration-150 hover-bg-white bg-white text-black"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
