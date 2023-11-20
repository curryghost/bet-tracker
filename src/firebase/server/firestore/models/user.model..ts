import type { GetBetDto } from "./bet.model";

export interface UserSchema {
  name: string;
  currentBankRoll: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetUser {
  name: string;
  currentBankRoll: number;
  createdAt: string;
  updatedAt: string;
  bets: GetBetDto[];
}
