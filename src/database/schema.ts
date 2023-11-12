export interface Bets {
  $id: string;
  $match_id: number;
  $stake: number;
  $odds: number;
  $created_at: string;
  $updated_at: string;
}
