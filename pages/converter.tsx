import React, { useEffect, useState } from "react";
import ExchangeCard from "@/components/ExchangeCard";
import { currenyRates } from "@/constants/currencyRates";

export default function Converter() {
  const [symbol, setSymbol] = useState<string>("");
  const [enteredAmount, setEnteredAmount] = useState<string>("0");
  const [chosenSymbol, setChosenSymbol] = useState<string>("");
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0);

  const getAmountAndSymbol = (symbol: string, amount?: string) => {
    setSymbol(symbol);
    amount != undefined && setEnteredAmount(amount);
  };

  const getSymbol = (symbol: string) => {
    setChosenSymbol(symbol);
  };

  useEffect(() => {
    setCalculatedAmount(0);
    setEnteredAmount("0");
  }, [symbol]);

  useEffect(() => {
    if (!enteredAmount) {
      setCalculatedAmount(0);
    }

    //calculate in euro base
    const amountInEuro = +enteredAmount / currenyRates[symbol]; // how mouch euro is in currency (upper)
    const amountInChosenCurrency = amountInEuro * currenyRates[chosenSymbol];

    setCalculatedAmount(+amountInChosenCurrency);
  }, [enteredAmount, chosenSymbol]);

  return (
    <div className="flex-1 p-2 bg-gray-200">
      <div className="w-full h-full flex flex-col ">
        <p className="text-2xl font-semibold">Converter</p>
        <div className="flex-1 flex items-center justify-center">
          <div className="mt-5 flex-1 flex justify-center gap-2 flex-col items-center">
            <ExchangeCard
              label="Enter amount"
              calculateCurrency={getAmountAndSymbol}
            />
            <ExchangeCard
              label="Amount"
              down
              calculatedAmount={calculatedAmount}
              calculateCurrency={getSymbol}
            />
            <button className="w-2/3 bg-[#705adf] mt-2 py-3 px-2 rounded-lg text-lg font-bold shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] text-white">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
