import { Button } from "@/components/ui";
import { AppLayoutSecondary } from "@/layouts";
import { Home, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <AppLayoutSecondary
      title="404 - Page Not Found"
      description="The page you are looking for does not exist."
    >
      <div className="flex gap-4 mx-auto mb-20">
        <Button>
          <Link to="/" className="flex items-center justify-center gap-2">
            <Home />
            Go Home
          </Link>
        </Button>
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          <RotateCcw />
          Reload
        </Button>
      </div>
    </AppLayoutSecondary>
  );
}
