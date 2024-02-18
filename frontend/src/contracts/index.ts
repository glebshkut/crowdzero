import { ethers } from "ethers";
import { campaignsABI } from "./abi/campaigns";
import { verifierABI } from "./abi/verifier";

const verifierAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
const signer = provider.getSigner();
export const verifier = new ethers.Contract(verifierAddress, verifierABI, signer);


const campaignsAddress = '0x59195B68f74d75C4878a76bDfeA92179Ac628B66';
export const campaigns = new ethers.Contract(campaignsAddress, campaignsABI, signer);
