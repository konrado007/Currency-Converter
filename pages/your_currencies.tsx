import CurrencyCard from "@/components/CurrencyCard";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function YourCurrencies() {
  const { state } = useContext(UserContext);

  return (
    <div className="flex-1 p-2 min-h-[612px]">
      <p className="text-2xl font-semibold">Your currencies</p>
      <div className="w-full flex flex-col gap-2 mt-5 overflow-y-scroll no-scrollbar max-h-[540px]">
        {state.currencies.map((c) => {

          return <CurrencyCard {...c}  />;
        })}
      </div>
    </div>
  );
}
