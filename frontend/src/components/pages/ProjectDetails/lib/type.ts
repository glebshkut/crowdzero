import { Address } from "viem";

export interface ProjectInterface {
  id: string;
  name: string;
  description: string;
  image_url: string;
  raised: number; // (default 0)
  goal: number;
  creator_address: Address;
  end_date: Date;
}

export enum ProjectStatus {
  Active = "active",
  PaidOut = "paidOut",
  Reached = "reached",
}