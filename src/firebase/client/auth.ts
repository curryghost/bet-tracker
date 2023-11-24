import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleAuthProvider);
};

export const checkRedirect = async () => {
  const res = await getRedirectResult(auth);
  if (!res) throw new Error("Google sign in failed");
  const idToken = await res.user.getIdToken();
  if (!idToken) throw new Error("Google sign in failed");
  return fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ idToken }),
  });
};

export const signOutUser = async () => {
  await signOut(auth);
  return fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({}),
  });
};
