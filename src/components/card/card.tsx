import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { HiOutlineArrowTrendingDown } from "react-icons/hi2";
import { IconContext } from "react-icons";

export interface CardProps {
  title: string;
  amount: number;
}

export default function Card({ title, amount }: CardProps) {
  return (
    <div className="space-y-3 rounded-md border border-gray-700 p-2 shadow-md shadow-gray-900">
      <h4 className="text-sm font-semibold tracking-wide">{title}</h4>
      <div className="flex items-center justify-between">
        <p
          className={`${
            amount > 0 ? "text-lime-400" : "text-red-500"
          } text-sm font-bold`}
        >
          ${amount.toFixed(2)}
        </p>
        <IconContext.Provider
          value={{
            className: `${
              amount > 0 ? "text-lime-400" : "text-red-500"
            } opacity-80 animate-pulse mr-2`,
            size: "1.2rem",
          }}
        >
          {amount > 0 ? (
            <HiOutlineArrowTrendingUp />
          ) : (
            <HiOutlineArrowTrendingDown />
          )}
        </IconContext.Provider>
      </div>
    </div>
  );
}
