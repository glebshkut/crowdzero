import { useParams } from 'react-router-dom';
import { ProjectInterface } from "../lib/type";
import { useEffect, useState } from "react";
import CommunityInfo from "@/components/shared/CommunityInfo";
import RaisedBar from "@/components/shared/RaisedBar";
import stylePrice from "@/components/shared/calculations/stylePrice";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

export default function ProjectDetails() {
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(10);
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

  const handleInputChange = (e: { target: { value: string; }; }) => {
    setAmount(Number(e.target.value));
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
        <div className="sm:w-[330px] w-1/3 h-[90%] my-auto">
          <div className="relative flex flex-col justify-center items-start gap-8 sm:w-[317px] w-[95%] bg-dark h-full p-5 rounded-2xl">
            <label htmlFor="my-drawer" className="absolute top-5 right-5">
              <XCircle size={32} color="#1790FF" />
            </label>

            <div className="flex flex-col justify-start gap-4">
              <span className="rounded-full bg-blue px-4 py-2 w-fit">You are Verified!</span>
              <span className="text-info">Choose how much you want to fund this project</span>
            </div>
            <div className="flex flex-col items-center gap-10">
              <div className="min-h-[105px] bg-placeholder-background p-3 flex gap-2 flex-col justify-center items-center rounded-lg">
                <img src="/assets/eth-token.png" alt="eth token icon" />
                <span className="text-info">
                  {(amount / 2528.44).toFixed(4)} ETH
                </span>
                <span className="text-primary">
                  {stylePrice(amount, true, true)} USD
                </span>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-secondary">$10</span>
                  <span className="text-secondary">{stylePrice(goal - raised, false, true)}</span>
                </div>
                <input type="range" min={0} max={`${2528.44 * (goal - raised)}`} value={amount} onChange={handleInputChange} className="range range-primary range-sm bg-placeholder-background" />
                <span className="text-secondary">Amount in USD</span>
                <input type="text" value={amount} onChange={handleInputChange} className="input input-bordered bg-secondary-background rounded-lg mt-1 w-4/5" />
              </div>
            </div>

            <div className="flex flex-col items-end w-full">
              <span>Estimated Fees: {stylePrice(amount * 0.01, true)}</span>
              <span>Total</span>
              <span className="text-5xl bg-primary-gradient-reverted text-transparent bg-clip-text font-black">
                {stylePrice(amount + amount * 0.01, true)}
              </span>
              <button className="mt-2 btn bg-primary-gradient text-info text-md font-bold rounded-lg w-fit drawer-button">
                <CheckCircle color="#222222" size={20} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}