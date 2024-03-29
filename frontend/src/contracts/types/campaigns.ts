import { Address } from "viem";

export interface CampaignCreatedEvent {
  creator: string;
  goal: number;
  _id: number;
}

export interface Campaign {
  campaignId: bigint;
  creator: Address;
  goal: bigint;
  raised: bigint;
  name: string;
  image: string;
  description: string;
  complete: boolean;
  deadline: bigint;
}

export interface Proof {
  a: {
    X: number;
    Y: number;
  };
  b: {
    X: [number, number];
    Y: [number, number];
  };
  c: {
    X: number;
    Y: number;
  };
}

export interface CampaignsContract {
  createCampaign(_goal: number, _name: string, _image: string, _description: string): void;
  donate(): void;
  id(): Promise<number>;
  sendProof(proof: Proof, input: [number], _id: number, amount: number): void;
  withdraw(campaignId: number): void;
}