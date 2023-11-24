import { db } from "../firestore";
import { BetStatus, type AddBetDto, type BetSchema } from "../models/bet.model";

export const addBet = async (bet: AddBetDto, uid: string) => {
  const newBet: BetSchema = {
    matchId: +bet.matchId,
    odds: +bet.odds,
    stake: +bet.stake,
    status: BetStatus.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = db.collection("users").doc(uid).collection("bets").doc();
  return docRef.set(newBet);
};
