import { Button } from "@/components/ui";
import { AppLayout } from "@/layouts";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Genders",
    href: "/",
  },
];

export function Genders() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border"></div>
        <div className="flex justify-between">
          <div></div>
          <div>
            <Button className="mr-4">Prev</Button>
            <Button>Next</Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
