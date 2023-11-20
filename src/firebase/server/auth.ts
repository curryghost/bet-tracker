import { getAuth } from "firebase-admin/auth";
import { ApiError } from "../../utils/error";
import { ErrorType } from "../../utils/error/models";
import { app } from "./firebase";
import { addUser, getUser } from "./firestore/repositories/user.repositories";

export const auth = getAuth(app);

export const getSessionCookie = async (idToken: string, expiresIn: number) => {
  if (idToken === undefined)
    throw new ApiError(ErrorType.UNAUTHORIZED, "User unauthenticated");
  const decodedToken = await auth.verifyIdToken(idToken);
  if (!decodedToken)
    throw new ApiError(ErrorType.UNAUTHORIZED, "User unauthenticated");
  try {
    await getUser(decodedToken.uid);
  } catch (err) {
    if (err instanceof ApiError && err.type === ErrorType.NOT_FOUND) {
      await addUser(decodedToken);
    } else {
      throw err;
    }
  }
  return auth.createSessionCookie(idToken, { expiresIn });
};

export const verifySessionCookie = async (
  sessionCookie: string | undefined | null,
) => {
  if (!sessionCookie)
    throw new ApiError(ErrorType.UNAUTHORIZED, "User unauthenticated");
  const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
  if (!decodedToken)
    throw new ApiError(ErrorType.UNAUTHORIZED, "User unauthenticated");
  if (decodedToken?.exp < Date.now() / 1000)
    throw new ApiError(ErrorType.UNAUTHORIZED, "User unauthenticated");
  return decodedToken;
};
