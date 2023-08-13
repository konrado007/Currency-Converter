import { countries } from "@/constants/currencyRates";
import React from "react";

interface Props {
  currency: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  label: "buy" | "sell";
}

const TransactionSection: React.FC<Props> = ({
  currency,
  amount,
  balanceBefore,
  balanceAfter,
  label,
}) => {
  return (
    <div className="flex flex-col items-center flex-[0.3]">
      <h2 className="font-bold text-xl text-center">
        You {label == "sell" ? "sold" : "bought"}:
      </h2>
      <div className="flex gap-1 items-center">
        <img
          className="w-[80px]"
          src={`https://www.countryflagicons.com/FLAT/32/${countries[currency]}.png`}
          alt=""
        />
        <div>
          <h2 className="text-2xl font-bold">{currency}</h2>
          <p className="text-2xl font-semibold">{amount}</p>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-[#9ca3af] ">
          Before {label == "sell" ? "sell" : "buy"}:{" "}
          <span className="text-green-400">{balanceBefore}</span>
        </h2>
        <h2 className="font-bold text-[#9ca3af] ">
          After {label == "sell" ? "sell" : "buy"}{" "}
          <span className="text-red-300">{balanceAfter}</span>
        </h2>
      </div>
    </div>
  );
};

export default TransactionSection;
