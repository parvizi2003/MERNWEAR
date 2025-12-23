import { AppSidebarLayout } from "@/layouts";
import { type BreadcrumbItem } from "@/types";
import { type ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
      {children}
    </AppSidebarLayout>
  );
}
