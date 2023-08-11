import {
  countries,
  specialCurrencies,
  symbols,
} from "@/constants/currencyRates";
import React, { useState, useEffect } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";

interface ExchangeCardProps {
  label: string;
  down?: boolean;
  calculatedAmount?: number;
  calculateCurrency: (symbol: string, amount?: string) => void;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  label,
  down,
  calculatedAmount,
  calculateCurrency,
}) => {
  const [selectedCurrencyName, setSelectedCurrencyName] = useState<string>(
    symbols[Object.keys(symbols)[0]] //first value of symbols object
  );
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState<string>(
    Object.keys(symbols)[0] //first key of symbols object
  );

  const [enteredAmount, setEnteredAmount] = useState<string>("0");
  const [flag, setFlag] = useState<string>("");

  const options = Object.keys(symbols).map((key) => (
    <option key={symbols[key]} value={symbols[key]}>
      {symbols[key]}
    </option>
  ));

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    Object.keys(symbols).map((key) => {
      if (symbols[key] == e.target.value) {
        setSelectedCurrencySymbol(key);
        return;
      }
    });

    setSelectedCurrencyName(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredAmount(e.target.value);
  };

  useEffect(() => {
    if (specialCurrencies[selectedCurrencySymbol]) {
      setFlag(specialCurrencies[selectedCurrencySymbol]);
    } else {
      setFlag(
        `https://www.countryflagicons.com/FLAT/32/${countries[selectedCurrencySymbol]}.png`
      );
    }

    setEnteredAmount("0");
  }, [selectedCurrencySymbol]);

  useEffect(() => {
    !down && calculateCurrency(selectedCurrencySymbol, enteredAmount); // invoke this function only for upper ExchangeCard
    down && calculateCurrency(selectedCurrencySymbol);
  }, [enteredAmount, selectedCurrencySymbol]);

  return (
    <div
      className={`${
        down && "relative"
      } bg-white w-2/3 rounded-lg p-4 h-fit shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]`}
    >
      <div>
        <h2 className="font-bold text-gray-400">Select your currency</h2>
        <div className="flex gap-2 items-center bg-[#edf0f9] rounded-lg p-2 w-full">
          <div>
            <img src={flag} className="w-[32px]" />
          </div>
          <select
            className="text-right w-full outline-none px-4 py-2 rounded-md bg-transparent appearance-none"
            onChange={handleSelectChange}
          >
            {options}
          </select>
          <IoIosArrowDown />
        </div>
      </div>

      <div className="mt-4 text-gray-400">
        <h2 className="font-bold">{label}</h2>
        <div className="flex gap-2 items-center">
          <p className="font-semibold">{selectedCurrencySymbol}</p>
          {!down ? (
            <input
              value={enteredAmount}
              type="number"
              onChange={handleInputChange}
              className="no-arrows outline-none text-right w-full h-full bg-[#edf0f9] rounded-lg p-2 font-bold text-black text-2xl"
            />
          ) : (
            <div className="no-arrows outline-none text-right w-full h-full bg-[#edf0f9] rounded-lg p-2 font-bold text-black text-2xl">
              {calculatedAmount}
            </div>
          )}
        </div>
      </div>
      {down && (
        <div className="absolute right-1 -top-6 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <CgArrowsExchangeAltV size={25} />
        </div>
      )}
    </div>
  );
};

export default ExchangeCard;
