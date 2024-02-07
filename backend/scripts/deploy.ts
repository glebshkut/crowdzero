import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const CrowdZero = await ethers.getContractFactory("CrowdZero");
  const crowdZero = await CrowdZero.deploy("0x1234567890123456789012345678901234567890", 86400, {
    from: deployer.address,
  });

  await crowdZero.waitForDeployment();

  console.log("CrowdZero deployed to:", crowdZero.getAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
