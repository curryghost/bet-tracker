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
  matchId: number;
  odds: number;
  stake: number;
}

export interface GetBetDto extends BetSchema {
  id: string;
}
