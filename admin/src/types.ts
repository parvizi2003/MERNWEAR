import type { LucideIcon } from "lucide-react";

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string | URL;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
