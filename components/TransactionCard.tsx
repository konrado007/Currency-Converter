import { Transaction } from "@/constants/context";
import { countries } from "@/constants/currencyRates";
import React, { useState } from "react";
import { GrTransaction } from "react-icons/gr";
import TransactionSection from "./TransactionSection";

interface Props {
  transaction: Transaction;
}

const TransactionCard: React.FC<Props> = ({ transaction }) => {
  const {
    date,
    currencyToSell,
    balanceBeforeToSell,
    balanceAfterToSell,
    amountOfCurrencyToSell,
    currencyToBuy,
    balanceBeforeToBuy,
    balanceAfterToBuy,
    amountOfCurrencyToBuy,
  } = transaction;

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  return (
    <div className="w-full p-3 bg-[#edf0f9] rounded-md">
      <nav className="text-center text-[#9ca3af] font-bold text-lg">
        {date.toLocaleDateString("en-US", options)}
      </nav>
      <div className="flex justify-between px-10 items-center">
        <TransactionSection
          label="sell"
          currency={currencyToSell}
          amount={amountOfCurrencyToSell}
          balanceBefore={balanceBeforeToSell}
          balanceAfter={balanceAfterToSell}
        />
        <div>
          <GrTransaction size={35} color={"#9ca3af"} />
        </div>
        <TransactionSection
          label="buy"
          currency={currencyToBuy}
          amount={amountOfCurrencyToBuy}
          balanceBefore={balanceBeforeToBuy}
          balanceAfter={balanceAfterToBuy}
        />
      </div>
    </div>
  );
};

export default TransactionCard;
