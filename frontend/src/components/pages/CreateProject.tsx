import { campaigns } from "@/contracts";

export default function CreateProject() {

  async function createNewCampaign() {
    try {
      const tx = await campaigns.createCampaign(
        10,
        "Campaign 111",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eth-diamond-rainbow.png/1200px-Eth-diamond-rainbow.png",
        'description cool'
      );

      // Wait for the transaction to be mined
      await tx.wait();

      console.log("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  }


  return (
    <div>
      <span>
        Create project
      </span>
      <button onClick={createNewCampaign}>
        Create campaign
      </button>
    </div>
  )
}