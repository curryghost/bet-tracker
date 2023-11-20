import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleAuthProvider);
  const idToken = await res.user.getIdToken();
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
