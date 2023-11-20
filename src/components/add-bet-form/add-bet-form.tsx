import { navigate } from "astro:transitions/client";
import type React from "react";
import Button from "../ui/button";
import Input from "../ui/input";

export default function AddBetForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    fetch("/api/add-bet", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        navigate("/");
      }
    });

    const event = new CustomEvent("open-toast", { detail: "Bet added!" });
    dispatchEvent(event);
  };

  return (
    <form
      className="mt-14 flex flex-col items-center gap-5"
      method="post"
      onSubmit={handleSubmit}
    >
      <Input name="matchId" type="text" placeholder="Match Id" />
      <Input name="odds" type="text" placeholder="Odds" />
      <Input name="stake" type="text" placeholder="Stake" />
      <Button type="submit">Add</Button>
    </form>
  );
}
