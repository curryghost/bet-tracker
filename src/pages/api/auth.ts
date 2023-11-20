import { type APIRoute } from "astro";
import { getSessionCookie } from "../../firebase/server/auth";
import { ApiError, errorHandler } from "../../utils/error";
import { ErrorType } from "../../utils/error/models";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { idToken } = await request.json();
    if (!idToken)
      throw new ApiError(ErrorType.UNAUTHORIZED, "User unauthenticated");

    const expiresIn = 1000 * 60 * 60 * 24 * 5;
    const sessionCookie = await getSessionCookie(idToken, expiresIn);
    cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
      path: "/",
    });

    return new Response("Authenticated", { status: 200 });
  } catch (error) {
    cookies.set("session", "", { expires: new Date(0), path: "/" });
    return errorHandler(error);
  }
};
