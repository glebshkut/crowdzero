import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import { NetworksUserConfig } from "hardhat/types/config";
import { ethers } from "ethers";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.8.20",
      },
    ],
  },
  networks: getNetworks(),
  etherscan: {
    apiKey: {
      "scroll-sepolia": "3JSKI3SBEJG9RZVZUNAS6XC471MV2BFZ8R",
    },
    customChains: [
      {
        network: "scroll-sepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
};

function getNetworks(): NetworksUserConfig {
  const accounts = [`0x${process.env.ETHEREUM_PRIVATE_KEY}`];
  return {
    "scroll-sepolia": {
      url: "https://sepolia-rpc.scroll.io/",
      accounts,
    },
    // Add other networks if needed
  };
}

export default config;
