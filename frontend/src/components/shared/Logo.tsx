import { Routes } from "@/constants/routes";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="relative w-[143px] h-[31px]">
      <Link to={Routes.HOME}>
        <img src="/assets/crowdzero-logo.png" alt="Crowdzero" />
      </Link>
    </div>
  )
}