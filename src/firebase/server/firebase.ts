import { initializeApp } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

export const app = initializeApp({
  projectId: "bet-tracker-404817",
});

export const auth = getAuth(app);

export const verifyIdToken = async (token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  return decodedToken;
};
