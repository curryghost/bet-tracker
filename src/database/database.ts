import Database from "bun:sqlite";
import type { Bets } from "./schema";
import type { AddBetDto } from "../models/add-bet.model";
import { v4 as uuidv4 } from "uuid";
export const db = new Database("db.sqlite", { create: true });

export const insertBet = async (bet: AddBetDto) => {
  const query = db.query(
    "INSERT INTO bets (id, match_id, stake, odds, created_at, updated_at) VALUES ($id, $match_id, $stake, $odds, $created_at, $updated_at)",
  );

  const betSchema: Bets = {
    $id: uuidv4(),
    $match_id: +bet.matchId,
    $stake: +bet.stake,
    $odds: +bet.odds,
    $created_at: Date.now().toString(),
    $updated_at: Date.now().toString(),
  };

  return query.run({ ...betSchema });
};

export const getAllBets = async () => {
  const query = db.query("SELECT * FROM bets");

  return query.all();
};
