import { useTheme } from "@/theme-provider";
import AppLogoIcon from "../../../public/mernwear_logo.ico";
import AppLogoIconDark from "../../../public/mernwear_logo_dark.ico";

export default function AppLogo() {
  const { resolvedTheme } = useTheme();

  const logoSrc = resolvedTheme === "dark" ? AppLogoIconDark : AppLogoIcon;

  return (
    <>
      <div className="flex aspect-square w-8 h-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        <img src={logoSrc} alt="logo_icon" className="w-full h-full" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">
          MERNWEAR
        </span>
      </div>
    </>
  );
}
