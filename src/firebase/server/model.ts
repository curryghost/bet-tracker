import type { DocumentReference } from "@google-cloud/firestore";

export enum BetStatus {
  Pending = "Pending",
  Won = "Won",
  Lost = "Lost",
}

export interface Bets {
  matchId: number;
  odds: number;
  stake: number;
  status: BetStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  currentBankRoll: number;
  bets: DocumentReference;
}
