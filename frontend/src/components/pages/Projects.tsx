import { campaigns } from "@/contracts";
import { useEffect, useState } from "react";
import ProjectItem from "../shared/ProjectItem";
import { ProjectInterface } from "./ProjectDetails/lib/type";
import { Campaign } from "@/contracts/types/campaigns";
import { useAccount } from "wagmi";
import { publicActions } from "viem";
import { campaignsABI } from "@/contracts/abi/campaigns";

export default function AllProjects() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const account = useAccount();

  useEffect(() => {
    async function readData() {
      const client = await account.connector?.getWalletClient();
      const data = await publicActions(client!).readContract({
        address: campaigns.address as `0x${string}`,
        abi: campaignsABI,
        functionName: 'getDeployedCampaigns',
      }) as Campaign[];
      console.log("🚀 ~ readData ~ data:", data)
      setProjects(data);
    }

    readData();
  }, [account.connector]);

  return (
    <div className="h-full flex flex-col gap-9 text-info py-16 px-40">
      <h3 className="text-3xl font-bold">
        All Projects
      </h3>
      <div className="grid grid-cols-3 gap-6">
        {
          projects.map(project => (
            <div key={project.campaignId}>
              <ProjectItem project={project} />
            </div>
          ))
        }
      </div>
    </div>
  )
}