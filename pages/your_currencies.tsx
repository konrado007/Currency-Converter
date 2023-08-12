import CurrencyCard from "@/components/CurrencyCard";
import { countries, specialCurrencies } from "@/constants/currencyRates";
import { UserContext } from "@/context/UserContext";
import { customRound } from "@/lib/currency";
import { useContext } from "react";

export default function YourCurrencies() {
  const { state } = useContext(UserContext);

  return (
    <div className="flex-1 p-2">
      <p className="text-2xl font-semibold">Your currencies</p>
      <div className="w-full flex flex-col gap-2 mt-5">
        {state.currencies.map((c) => {

          return <CurrencyCard {...c}  />;
        })}
      </div>
    </div>
  );
}
