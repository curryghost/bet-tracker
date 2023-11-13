import type { APIRoute } from "astro";
import { addBets } from "../../firebase/server/firestore";
import type { AddBetDto } from "../../models/add-bet.model";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const bet = Object.fromEntries(formData) as unknown as AddBetDto;
    if (!bet) throw new Error("No bet data provided");
    const idToken = request.headers
      .get("Cookie")
      ?.split(";")
      .find((c) => c.startsWith("idToken"))
      ?.split("=")[1];

    if (!idToken) throw new Error("No idToken provided");
    await addBets(bet, idToken);
    return redirect("/", 308);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
};
