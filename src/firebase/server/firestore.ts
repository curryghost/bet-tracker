import { Firestore } from "@google-cloud/firestore";
import { v4 as uuidv4 } from "uuid";
import type { AddBetDto, GetBetDto } from "../../models/add-bet.model";
import { app } from "./firebase";

export const addBets = async (bets: AddBetDto, idToken: string) => {
  const isValid = !!(await app.auth().verifyIdToken(idToken));
  const newBet: GetBetDto = {
    id: uuidv4(),
    odds: bets.odds,
    stake: bets.stake,
    matchId: bets.matchId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  if (isValid) {
    const db = new Firestore({
      projectId: "bet-tracker-404817",
      keyFilename: "/workspaces/bet-tracker/service-account-key.json",
    });
    const docRef = db.collection("bets").doc("test");
    await docRef.set(newBet);
  }
};
