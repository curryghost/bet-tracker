import type { GetBetDto } from "../../models/add-bet.model";

export default function BetList({ bets }: { bets: GetBetDto[] }) {
  // const betList = bets.map((bet) => {
  //   return (
  //     <li key={bet.$id}>
  //       <p>{bet.$match_id}</p>
  //       <p>{bet.$odds}</p>
  //       <p>{bet.$stake}</p>
  //     </li>
  //   );
  // });

  return (
    <div>
      <ul className="mx-auto flex max-w-lg flex-col gap-3 p-5">
        {bets.map((bet) => {
          return (
            <li
              className="flex justify-between gap-2 rounded-2xl border border-gray-700 p-3"
              key={bet.id}
            >
              <p>Match: {bet.match_id}</p>
              <p>Odds: {bet.odds}</p>
              <p>Stake: {bet.stake}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
