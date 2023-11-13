import { Firestore } from "@google-cloud/firestore";
import type { AddBetDto, GetBetDto } from "../../models/add-bet.model";
import { app } from "./firebase";
import { BetStatus, type Bets } from "./model";

const db = new Firestore({
  projectId: "bet-tracker-404817",
});

export const addBets = async (bets: AddBetDto, idToken: string) => {
  const decodedToken = await app.auth().verifyIdToken(idToken);
  if (!decodedToken) throw new Error("User unauthenticated");

  const newBet: Bets = {
    matchId: +bets.matchId,
    odds: +bets.odds,
    stake: +bets.stake,
    status: BetStatus.Pending,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = db
    .collection("users")
    .doc(decodedToken.uid)
    .collection("bets")
    .doc();
  await docRef.set(newBet);
};

export const getBets = async (idToken: string) => {
  const decodedToken = await app.auth().verifyIdToken(idToken);
  if (!decodedToken) throw new Error("User unauthenticated");

  const betsSnapshot = await db
    .collection("users")
    .doc(decodedToken.uid)
    .collection("bets")
    .get();

  if (betsSnapshot.empty) {
    return [];
  }

  let bets: GetBetDto[] = [];
  betsSnapshot.forEach((doc) => {
    const { matchId, odds, stake, status, createdAt, updatedAt } = doc.data();
    bets.push({
      matchId,
      odds,
      stake,
      status,
      createdAt,
      updatedAt,
    });
  });

  return bets;
};
