import Logo from "@/components/shared/Logo";
import { Link } from "react-router-dom";
import { Routes } from "@/constants/routes";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

export default function NavBar() {
  const { isConnected } = useAccount();
  return (
    <div className="bg-secondary-background px-10 py-6 flex justify-between items-center w-full">
      <div className="flex flex-row justify-between items-center gap-6">
        <Logo />
        {isConnected && (
          <>
            <Link to={Routes.PROJECTS} className="text-info text-md">
              Open Projects
            </Link>
            <Link to={Routes.MY_PROJECTS} className="text-info text-md">
              Projects Funded
            </Link>
          </>
        )}
      </div>
      <ConnectKitButton />
    </div>
  )
}