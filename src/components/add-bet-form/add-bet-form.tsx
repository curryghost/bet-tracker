import Input from "../ui/input";
import Button from "../ui/button";

export default function AddBetForm() {
  return (
    <form className="mt-14 flex flex-col items-center gap-5">
      <Input type="text" placeholder="Bet Id" />
      <Input type="text" placeholder="Odds" />
      <Input type="text" placeholder="Stake" />
      <Button>Add</Button>
    </form>
  );
}
