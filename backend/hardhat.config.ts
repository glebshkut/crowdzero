import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.8.0",
      },
    ],
  },
  networks: {
    sepolia: {
      url: process.env.SCROLL_TESNET_URL,
      accounts:process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  }
};

export default config;