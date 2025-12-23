import {
  AppContent,
  AppShell,
  AppSidebar,
  AppSidebarHeader,
} from "@/components/shared";

import { type BreadcrumbItem } from "@/types";
import { type PropsWithChildren } from "react";

export function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  );
}
