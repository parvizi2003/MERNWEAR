import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { resolveUrl } from "@/lib/utils";
import { type NavItem } from "@/types";
import { Link, useLocation } from "react-router-dom";

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const { pathname } = useLocation();
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={pathname === resolveUrl(item.href)}
              tooltip={{ children: item.title }}
            >
              <Link to={item.href}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
