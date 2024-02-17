import { Routes } from "@/constants/routes";
import { ArrowCircleRight, PlusSquare } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-10 justify-center items-center min-screen-height">
        <div className="relative w-[1262px] mt-10">
          <img src="/assets/landing-svg.png" className="z-0" alt="landing svg" />
          <div className="absolute w-[80%] top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-7">
            <h1 className="text-[62px] text-info font-bold text-center leading-10">
              Where crowds get funded.
            </h1>
            <h4 className="text-3xl text-secondary text-center">
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
        <img src="/assets/enter-platform.png" className="py-32" alt="Enter platform" width={600} />
        <img src="/assets/go-funding.png" className="pb-10" alt="Go funding" width={500} />
        <div className="relative mb-40">
          <img src="/assets/get-funded.png" className="z-0" alt="Get funding" width={1170} />
          <div className="absolute w-[80%] top-[62%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <Link to={Routes.CREATE_PROJECT} className="btn bg-primary-gradient text-gradient-button">
              <PlusSquare size={20} color="#222222" />
              Create Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}