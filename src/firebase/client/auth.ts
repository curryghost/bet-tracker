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
  return await signInWithPopup(auth, googleAuthProvider);
};

export const signOutUser = async () => {
  return await signOut(auth);
};
