import { ethers } from "ethers";
import { campaignsABI } from "./abi/campaigns";
import { verifierABI } from "./abi/verifier";

const verifierAddress = "0x2211Ba4a8c24a42dfFb43c1ed24b2AAE002Ea215"
export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
const signer = provider.getSigner();
export const verifier = new ethers.Contract(verifierAddress, verifierABI, signer);


const campaignsAddress = '0x2211Ba4a8c24a42dfFb43c1ed24b2AAE002Ea215';
export const campaigns = new ethers.Contract(campaignsAddress, campaignsABI, signer);
