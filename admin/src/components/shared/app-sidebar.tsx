import { NavMain, NavUser, AppLogo } from "@/components/shared";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";

import { type NavItem } from "@/types";
import { ChartColumnStacked, LayoutGrid, VenusAndMars } from "lucide-react";
import { Link } from "react-router-dom";

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutGrid,
  },
  {
    title: "Genders",
    href: "/genders",
    icon: VenusAndMars,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: ChartColumnStacked,
  },
];
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={"/"}>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
