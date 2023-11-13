import type { APIRoute } from "astro";
import type { AddBetDto } from "../../models/add-bet.model";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const bet = Object.fromEntries(formData) as unknown as AddBetDto;

  return redirect("/", 308);
};
