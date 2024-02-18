import { Campaign } from "@/contracts/types/campaigns";

export interface ProjectInterface extends Campaign {
}

export enum ProjectStatus {
  Active = "active",
  PaidOut = "paidOut",
  Reached = "reached",
}