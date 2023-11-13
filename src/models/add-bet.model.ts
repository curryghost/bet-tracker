import type { BetStatus } from "../firebase/server/model";

export interface AddBetDto {
  matchId: string;
  odds: string;
  stake: string;
}

export interface GetBetDto {
  matchId: number;
  odds: number;
  stake: number;
  createdAt: string;
  updatedAt: string;
  status: BetStatus;
}

export interface GetUserDto {
  name: string;
  currentBankRoll: number;
  bets: GetBetDto[];
}
