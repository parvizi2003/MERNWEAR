import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui";
import { UserInfo } from "@/components/shared";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";

import { type User } from "@/types";
import { LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "@/api/auth/use-logout";

interface UserMenuContentProps {
  user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
  const cleanup = useMobileNavigation();

  const { handleLogout, isPending } = useLogout();

  const handleClickLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleLogout();
    cleanup();
  };
  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo user={user} showEmail={true} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link className="block w-full" to="" onClick={cleanup}>
            <Settings className="mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          className="block w-full"
          to=""
          onClick={handleClickLogout}
          data-test="logout-button"
        >
          <LogOut className="mr-2" />
          Log out
        </Link>
      </DropdownMenuItem>
    </>
  );
}
