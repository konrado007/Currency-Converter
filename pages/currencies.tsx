import {
  countries,
  currencyRates,
  specialCurrencies,
  symbols,
} from "@/constants/currencyRates";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Currencies() {
  const [filter, setFilter] = useState<string>("");

  return (
    <div className="flex-1 p-2 ">
      <div className="w-full h-full flex flex-col max-h-[520px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-2xl font-semibold">All currencies</p>
          <div className="flex gap-2 items-center mr-5 bg-gray-200 rounded-full p-2 px-3">
            <BsSearch size={15} />
            <input
              type="text"
              className="bg-transparent outline-none border-none"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <h2 className="text-xl font-bold">Base: </h2>
          <img
            src={"https://www.countryflagicons.com/FLAT/32/EU.png"}
            className="mt-1"
          />
          <h2 className="text-md font-bold">EURO</h2>
        </div>
        <div className="overflow-y-scroll no-scrollbar flex flex-col gap-2 mt-2">
          {Object.keys(currencyRates).map((currency) => {
            let img = `https://www.countryflagicons.com/FLAT/32/${countries[currency]}.png`;
            if (specialCurrencies[currency] !== undefined) {
              img = specialCurrencies[currency];
            }

            if (
              currency
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase()) ||
              symbols[currency]
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
            ) {
              return (
                <div className="w-full flex items-center justify-between bg-gray-200 rounded-full px-5 py-3">
                  <div className="flex gap-3 items-center flex-[.3]">
                    <img src={img} className="w-[32px]" />
                    <h2 className="font-bold text-lg text-gray-500">
                      {currency}
                    </h2>
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-500">
                      {symbols[currency]}
                    </h2>
                    <p className="font-bold">
                      {currencyRates[currency].toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
