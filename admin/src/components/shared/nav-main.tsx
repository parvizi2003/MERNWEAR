import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { resolveUrl } from "@/lib/utils";
import { type NavItem } from "@/types";
import { Link } from "react-router-dom";

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const location = window.location.pathname;
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={location.startsWith(resolveUrl(item.href))}
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
