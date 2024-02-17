import "@nomicfoundation/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";

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
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    }
  }
};

export default config;
