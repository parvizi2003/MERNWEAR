import { AppLogoImage } from "./app-logo-image";

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <AppLogoImage />
      <div className="grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">
          MERNWEAR
        </span>
      </div>
    </div>
  );
}
