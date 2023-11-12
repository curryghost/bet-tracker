import Input from "../ui/input";
import Button from "../ui/button";
import type React from "react";

export default function AddBetForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    fetch("/api/add-bet", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.redirected) {
        document.getElementById("home")?.click();
      }
    });
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
