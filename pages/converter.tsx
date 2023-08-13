import React, { useContext, useEffect, useState } from "react";
import ExchangeCard from "@/components/ExchangeCard";
import { currencyRates } from "@/constants/currencyRates";
import { UserContext } from "@/context/UserContext";
import { customRound } from "@/lib/currency";

export default function Converter() {
  const [symbol, setSymbol] = useState<string>("");
  const [enteredAmount, setEnteredAmount] = useState<string>("0");
  const [chosenSymbol, setChosenSymbol] = useState<string>("");
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0);
  const [disable, setDisable] = useState<boolean>(false);

  const { state, dispatch } = useContext(UserContext);

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
    const amountInEuro = +enteredAmount / currencyRates[symbol]; // how mouch euro is in currency (upper)
    const amountInChosenCurrency = amountInEuro * currencyRates[chosenSymbol];

    setCalculatedAmount(+amountInChosenCurrency);
  }, [enteredAmount, chosenSymbol]);

  const buyCurrency = () => {
    const exists = state.currencies.find((c) => c.name == symbol);
    if (exists && exists.amount >= +enteredAmount) {
      dispatch({
        type: "BUY",
        payload: {
          currencyToExchange: symbol,
          currencyToBuy: chosenSymbol,
          amountOfCurrencyToExchange: +customRound(+enteredAmount),
          amountOfCurrencyToBuy: +customRound(calculatedAmount),
        },
      });

      setCalculatedAmount(0);
      setEnteredAmount("0");
    }
  };

  useEffect(() => {
    const symbols = state.currencies.map((c) => c.name);

    setDisable(!symbols.includes(symbol));
  }, [symbol]);

  return (
    <div className="flex-1 p-2 bg-gray-200 min-h-[612px]">
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
              calculatedAmount={+customRound(calculatedAmount)}
              calculateCurrency={getSymbol}
            />
            <button
              disabled={disable}
              className={`w-2/3 ${
                disable ? "bg-[#aea6d1]" : "bg-[#705adf]"
              }  mt-2 py-3 px-2 rounded-lg text-lg font-bold shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] text-white`}
              onClick={buyCurrency}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
