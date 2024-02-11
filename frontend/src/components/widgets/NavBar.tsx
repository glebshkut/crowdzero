import Logo from "@/components/shared/Logo";
import { ConnectKitButton } from "connectkit";

export default function NavBar() {
  return (
    <div className="bg-secondary-background px-10 py-6 flex justify-between items-center w-full">
      <Logo />
      <ConnectKitButton />
    </div>
  )
}