import {
  countries,
  specialCurrencies,
  symbols,
} from "@/constants/currencyRates";
import React from "react";

interface Props {
  name: string;
  amount: number;
}

const CurrencyCard: React.FC<Props> = ({ name, amount }) => {
  return (
    <div className="p-2 rounded-lg flex items-center gap-2 justify-between bg-[#edf0f9]">
      <div className="">
        <img
          className="w-[80px]"
          src={
            specialCurrencies[name] ||
            `https://www.countryflagicons.com/FLAT/64/${countries[name]}.png`
          }
        />
      </div>
      <div className="flex justify-between flex-1">
        <div>
          <h2 className="font-bold text-2xl">{name}</h2>
          <h3 className="text-[#949494]">{symbols[name]}</h3>
        </div>
        <p className="font-bold text-2xl self-end">
          {amount} {name}
        </p>
      </div>
    </div>
  );
};

export default CurrencyCard;
