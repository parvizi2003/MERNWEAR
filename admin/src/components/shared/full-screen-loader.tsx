import { AppLogoImage } from "./app-logo-image";

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center">
      <div className="animate-spin animation-duration-2000 si">
        <AppLogoImage />
      </div>
    </div>
  );
}
