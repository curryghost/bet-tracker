import { type APIRoute } from "astro";
import { verifySessionCookie } from "../../firebase/server/auth";
import type { AddBetDto } from "../../firebase/server/firestore/models/bet.model";
import { addBet } from "../../firebase/server/firestore/repositories/bet.repositories";
import { ApiError, errorHandler } from "../../utils/error";
import { ErrorType } from "../../utils/error/models";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const bet = Object.fromEntries(formData) as unknown as AddBetDto;
    if (!bet) throw new ApiError(ErrorType.BAD_REQUEST, "No bet provided");
    console.log(request.headers.get("cookie"));
    const sessionCookie = request.headers
      .get("cookie")
      ?.split(";")
      .find((val) => val.includes("session"))
      ?.split("=")[1];
    const idToken = await verifySessionCookie(sessionCookie);
    if (!idToken) throw new Error("No idToken provided");

    await addBet(bet, idToken.uid);
    return new Response("Bet added", { status: 200 });
  } catch (err) {
    return errorHandler(err);
  }
};
