import { Routes } from "@/constants/routes";
import { ArrowCircleRight, PlusSquare } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-10 justify-center items-center screen-height">
        <h1 className="text-7xl text-info">
          Where crowds get funded.
        </h1>
        <h4 className="text-3xl text-secondary">
          Fund raise anonymously onchain
        </h4>
        <div className="flex flex-row justify-between gap-5">
          <Link to={Routes.PROJECTS} className="btn btn-primary">
            <ArrowCircleRight size={20} />
            Go Funding
          </Link>
          <Link to={Routes.CREATE_PROJECT} className="btn bg-primary-gradient text-gradient-button">
            <PlusSquare size={20} color="#222222" />
            Create Project
          </Link>
        </div>
      </div>
    </div>
  )
}