import { campaigns } from "@/contracts";
import { useState } from "react";
import stylePrice from "../shared/calculations/stylePrice";
import { PlusSquare } from "@phosphor-icons/react";
import { campaignsABI } from "@/contracts/abi/campaigns";
import { useAccount } from "wagmi";
import { ProjectInterface } from "./ProjectDetails/lib/type";
import { scrollTestnet } from "viem/chains";

export default function CreateProject() {
  const [goal, setGoal] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image_url, setImageUrl] = useState<string>("");
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const account = useAccount();

  async function readData() {
    const client = await account.connector?.getWalletClient();
    const data = await client!.writeContract({
      address: campaigns.address as `0x${string}`,
      abi: campaignsABI,
      functionName: 'createCampaign',
      args: [goal, name, image_url, description],
      chain: scrollTestnet,
    }) as unknown as ProjectInterface[];
    console.log("🚀 ~ readData ~ data:", data)
  }

  async function createNewCampaign() {
    if (!goal || !name || !description || !image_url) return;

    setIsButtonLoading(true);
    try {
      await readData();

      console.log("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
    setIsButtonLoading(false);
  }


  return (
    <div className="h-full flex flex-col gap-8 text-info py-16 px-40">
      <h1 className="font-bold text-3xl">
        Create Event
      </h1>
      <div className="flex gap-12">
        <div className="flex flex-col gap-5 w-1/3 max-w-[300px]">
          {
            image_url.length > 0 ? (
              <img src={image_url} alt="Fundraiser Image" />
            ) : (
              <div className="relative">
                <div className="w-full h-60 bg-secondary-background rounded-lg" />
                <PlusSquare size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary" />
              </div>
            )
          }
        </div>
        <div className="flex flex-col gap-6 w-1/3">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-md font-bold text-primary">Target</span>
              <div className="flex justify-start items-center gap-2">
                <img src="/assets/eth-token.png" className="h-[40px]" alt="eth token" />
                <input type="text" className="input text-lg bg-secondary-background text-secondary" placeholder="000" value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>
              <span className="text-gray text-lg">
                {stylePrice(Number(goal))}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-md font-bold text-primary">Image</span>
              <input type="text" className="input text-lg bg-secondary-background text-secondary" placeholder="https://my-image.com/event.png" value={image_url} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-info text-2xl">Project</h3>
              <span className="text-md font-bold text-primary">Title</span>
              <input type="text" className="input text-lg bg-secondary-background text-secondary" placeholder="My cool project" value={name} onChange={(e) => setName(e.target.value)} />
              <span className="text-md font-bold text-primary">Description</span>
              <textarea className="textarea text-lg min-h-[150px] bg-secondary-background text-secondary" placeholder="Enter a short description for your project to get people to want to contribute and fund." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button className="btn bg-primary-gradient text-gradient-button font-bold rounded-lg w-fit drawer-button" onClick={createNewCampaign}>
              {isButtonLoading && <span className="loading loading-spinner" />}
              Create with <img src="/assets/crowdzero-logo.png" width={143} height={31} alt="crowdzero logo" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}