import type { DecodedIdToken } from "firebase-admin/auth";
import { ApiError } from "../../../../utils/error";
import { ErrorType } from "../../../../utils/error/models";
import { db } from "../firestore";
import type { GetBetDto } from "../models/bet.model";
import type { GetUser, UserSchema } from "../models/user.model.";

export const getUser = async (uid: string) => {
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists)
    throw new ApiError(ErrorType.NOT_FOUND, "User not found");
  const betCollection = await db
    .collection("users")
    .doc(uid)
    .collection("bets")
    .get();

  if (betCollection.empty) {
    return [];
  }

  let bets: GetBetDto[] = [];
  betCollection.forEach((doc) => {
    const { matchId, odds, stake, status, createdAt, updatedAt } = doc.data();
    bets.push({
      id: doc.id,
      matchId,
      odds,
      stake,
      status,
      createdAt,
      updatedAt,
    });
  });

  let user: GetUser = userDoc.data() as GetUser;
  return bets;
};

export const addUser = async (decodedToken: DecodedIdToken) => {
  const newUser: UserSchema = {
    name: decodedToken.email ?? "",
    currentBankRoll: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection("users").doc(decodedToken.uid).set(newUser);
};
