import { ethers } from "ethers";
import { campaignsABI } from "./abi/campaigns";
import { verifierABI } from "./abi/verifier";

const verifierAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"
export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
const signer = provider.getSigner();
export const verifier = new ethers.Contract(verifierAddress, verifierABI, signer);


const campaignsAddress = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788';
export const campaigns = new ethers.Contract(campaignsAddress, campaignsABI, signer);
