export enum BetStatus {
  WIN = "win",
  LOSE = "lose",
  PENDING = "pending",
}

export interface BetSchema {
  matchId: number;
  odds: number;
  stake: number;
  createdAt: string;
  updatedAt: string;
  status: BetStatus;
}

export interface AddBetDto {
  matchId: string;
  odds: string;
  stake: string;
}

export interface GetBetDto extends BetSchema {
  id: string;
}
