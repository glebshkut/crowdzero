import { useParams } from 'react-router-dom';
import { ProjectInterface } from "../lib/type";
import { useEffect, useState } from "react";
import CommunityInfo from "@/components/shared/CommunityInfo";
import RaisedBar from "@/components/shared/RaisedBar";
import stylePrice from "@/components/shared/calculations/stylePrice";
import { XCircle } from "@phosphor-icons/react";

export default function ProjectDetails() {
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("40");
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    setProject({
      id: projectId as string,
      name: "Project Name",
      description: "Project description Project description Project description, because Project description, because Project description Project description Project description Project description, because Project description, because Project description",
      image_url: "https://via.placeholder.com/300",
      raised: 750,
      goal: 1000,
      creator_address: "0x123",
      end_date: new Date()
    });
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }


  const {
    name,
    description,
    image_url,
    raised,
    goal,
    // creator_address,
    // end_date
  } = project;

  return (
    <div className="h-full drawer drawer-end overflow-x-hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="mt-16 ml-40">
        <h1 className="font-bold text-3xl">
          Fund Project
        </h1>
        <div className="flex gap-12 mt-7">
          <div className="flex flex-col gap-5 w-1/3 max-w-[300px]">
            <img src={image_url} alt="Fundraiser Image" />
            <CommunityInfo />
          </div>
          <div className="flex flex-col gap-6 w-1/3">
            <div>
              <span className="text-md font-bold text-action">Target</span>
              <h3 className="text-5xl bg-primary-gradient-reverted text-transparent bg-clip-text font-black">
                {goal} ETH
              </h3>
              <span className="text-primary text-lg">
                {/* move logic to model folder */}
                {stylePrice(goal)} USD
              </span>
            </div>
            <div>
              <h4 className="text-2xl">
                {name}
              </h4>
              <span className="text-md">
                {description}
              </span>
            </div>
            {isVerified ? (
              <label htmlFor="my-drawer" className="btn bg-primary-gradient text-gradient-button font-bold rounded-lg w-fit drawer-button">
                Fund with <img src="/assets/crowdzero-logo.png" className="relative bottom-1" width={143} height={31} alt="crowdzero logo" />
              </label>
            ) : (<div className="flex items-center gap-6">
              <button className="btn btn-primary" onClick={() => {
                setIsButtonLoading(true)
                setTimeout(() => {
                  setIsVerified(true)
                  setIsButtonLoading(false)
                }, 2000)
              }}>
                {isButtonLoading && <span className="loading loading-spinner" />}
                Verify and Join!
              </button>
              <span className="text-primary text-sm">
                Join this community quick and easy and anonymously!
              </span>
            </div>
            )}
            <div className="bg-secondary-background rounded-2xl p-4 gap-2 flex flex-col">
              <span className="font-bold">Fundrasiing Status</span>
              <RaisedBar raised={raised} goal={goal} />
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side overflow-x-hidden">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay blur-3xl"></label>
        <div className="w-1/3 h-[90%] my-auto">
          <div className="relative flex flex-col justify-center items-start gap-8 w-[95%] bg-dark h-full p-5 rounded-2xl">
            <label htmlFor="my-drawer" className="absolute top-5 right-5">
              <XCircle size={32} color="#1790FF" />
            </label>

            <div className="flex flex-col justify-start gap-4">
              <span className="rounded-full bg-blue px-4 py-2 w-fit">You are Verified!</span>
              <span className="text-info">Choose how much you want to fund this project</span>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-secondary">$10</span>
                <span className="text-secondary">{stylePrice(goal - raised)}</span>
              </div>
              <input type="range" min={0} max={`${2528.44 * (goal - raised)}`} value={amount} className="range range-primary" />
              <span className="text-secondary">Amount shown in USD</span>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="input input-bordered border-info bg-secondary-background rounded-lg w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}