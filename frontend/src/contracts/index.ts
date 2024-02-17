import { ethers } from "ethers";
import { campaignsABI } from "./abi/campaigns";
import { verifierABI } from "./abi/verifier";

const verifierAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_RPC_URL)
export const verifier = new ethers.Contract(verifierAddress, verifierABI, provider);


const campaignsAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
export const campaigns = new ethers.Contract(campaignsAddress, campaignsABI, provider);
