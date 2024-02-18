import RaisedBar from "@/components/shared/RaisedBar";
import stylePrice from "@/components/shared/calculations/stylePrice";
import { campaigns } from "@/contracts";
import { campaignsABI } from "@/contracts/abi/campaigns";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { publicActions } from "viem";
import { useAccount } from "wagmi";
import { ModalStage } from "../lib/modal";
import { ProjectInterface } from "../lib/type";
import Drawer from "./Drawer";
import ProcessingModal from "./ProcessingModal";

export default function ProjectDetails() {
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [modalStage, setModalStage] = useState<ModalStage | null>(null);
  const [amount, setAmount] = useState<number>(10);
  const { projectId } = useParams<{ projectId: string }>();
  const account = useAccount();

  useEffect(() => {
    async function readData() {
      const client = await account.connector?.getWalletClient();
      const data = await publicActions(client!).readContract({
        address: campaigns.address as `0x${string}`,
        abi: campaignsABI,
        functionName: 'getDeployedCampaigns',
      }) as ProjectInterface[];
      console.log("🚀 ~ readData ~ data:", data)
      setProject(data.find((project) => Number(project.campaignId).toString() == projectId) as ProjectInterface);
    }

    readData();
  }, [account.connector, projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const isInactive = project.raised === project.goal;

  const handleInputChange = (e: { target: { value: string; }; }) => {
    setAmount(Number(e.target.value));
  }

  const handleProcessing = async () => {
    setModalStage(ModalStage.Approve);
    const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement;
    modalElement.showModal();
    setModalStage(ModalStage.Processing);
    await donate();
    setModalStage(ModalStage.Complete);
  }

  async function donate() {
    setIsButtonLoading(true);
    try {
      const tx = await campaigns.donate({
        value: ethers.utils.parseEther((amount / 2528.44 * 1.01).toString())
      })

      // Wait for the transaction to be mined
      const res = await tx.wait();
      console.log("🚀 ~ donate ~ res:", res)

      console.log("Doanted successfully!");
    } catch (error) {
      console.error("Error occured while donating:", error);
    }
    setIsButtonLoading(false);
  }

  const {
    name,
    description,
    image: image_url,
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
            {/* <CommunityInfo /> */}
          </div>
          <div className="flex flex-col gap-6 w-1/3">
            <div>
              <span className="text-md font-bold text-action">Target</span>
              <h3 className="text-5xl bg-primary-gradient-reverted text-transparent bg-clip-text font-black">
                {Number(goal)} ETH
              </h3>
              <span className="text-primary text-lg">
                {/* move logic to model folder */}
                {stylePrice(Number(goal))} USD
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
            {/* <GetProof program="yourProgram" proofArguments={["argument1", "argument2"]} /> */}

            {isInactive ? (
              <></>
            ) : isVerified ? (
              <label htmlFor="my-drawer" className="btn bg-primary-gradient text-gradient-button font-bold rounded-lg w-fit drawer-button">
                  Fund with <img src="/assets/crowdzero-logo.png" width={143} height={31} alt="crowdzero logo" />
              </label>
              ) : (
                <div className="flex items-center gap-6">
                  <button className="btn btn-primary" onClick={() => {
                    setIsButtonLoading(true)
                      // tx(writeContracts.Campaigns.sendProof({ value: ethers.utils.parseEther("0.5") }));
                      setIsVerified(true)
                      setIsButtonLoading(false)
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
              <RaisedBar raised={Number(raised)} goal={Number(goal)} />
            </div>
          </div>
        </div>
      </div>
      <Drawer amount={amount} handleInputChange={handleInputChange} project={project} handleSubmit={handleProcessing} />
      <ProcessingModal stage={modalStage} />
    </div>
  );
}