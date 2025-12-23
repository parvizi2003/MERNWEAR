import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui";
import { UserInfo, UserMenuContent } from "@/components/shared";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronsUpDown } from "lucide-react";

const user = {
  id: 1,
  name: "Qurbon",
  email: "qurbon@gmail.com",
  email_verified_at: "",
  isAdmin: true,
  created_at: "",
  updated_at: "",
};

export function NavUser() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
              data-test="sidebar-menu-button"
            >
              <UserInfo user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            side={
              isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom"
            }
          >
            <UserMenuContent user={user} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
