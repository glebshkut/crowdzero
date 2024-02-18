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
    hardhat: {
      accounts: [
        {
          privateKey: "0x1234567890123456789012345678901234567890123456789012345678901234",
          balance: '10000000000000000000000'
        }
      ],
      chainId: 1337,
    },
  },
};

export default config;
