import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Verifier = await ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  console.log(`Verifier address: ${verifier.target}`)

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const Campaigns = await ethers.getContractFactory("Campaigns");
  const campaigns = await Campaigns.deploy(verifier.target);


  console.log("Campaigns deployed to:", await campaigns.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
