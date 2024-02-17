import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import { NetworksUserConfig } from "hardhat/types";
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
  etherscan: {
    apiKey: {
      "scroll-sepolia": process.env.SCROLL_SEPOLIA_API_KEY!,
    },
    customChains: [
      {
        network: "scroll-sepolia",
        chainId: 534351,
        urls: {
          apiURL: `https://api-sepolia.scrollscan.com/${process.env.SCROLL_SEPOLIA_API_KEY!}`,
          browserURL: "https://sepolia-rpc.scroll.io/"
        }
      }
    ]
  }
};

function getNetworks(): NetworksUserConfig {

  // COMMENT THIS OUT -- NO REASON TO FORCE INFURA
  // if (!process.env.INFURA_API_KEY || !process.env.ETHEREUM_PRIVATE_KEY) {
  //     return {}
  // }

  const accounts = [`0x${process.env.ETHEREUM_PRIVATE_KEY}`]
  const infuraApiKey = process.env.INFURA_API_KEY

  return {
    // other networks ...,
    "scroll-sepolia": {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts
    }
  }
}

export default config;
