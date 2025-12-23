import { useTheme } from "@/theme-provider";
import AppLogoIcon from "/mernwear_logo.ico";
import AppLogoIconDark from "/mernwear_logo_dark.ico";
import { cn } from "@/lib/utils";

export function AppLogoImage() {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? AppLogoIconDark : AppLogoIcon;
  return (
    <div
      className={cn(
        "flex size-8 aspect-square items-center justify-center rounded-md"
      )}
    >
      <img src={logoSrc} alt="logo_icon" className="w-full h-full" />
    </div>
  );
}
