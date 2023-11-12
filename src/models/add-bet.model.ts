export interface AddBetDto {
  matchId: string;
  odds: string;
  stake: string;
}

export interface GetBetDto {
  id: string;
  match_id: string;
  odds: string;
  stake: string;
  createdAt: string;
  updatedAt: string;
}
