import TransactionCard from "@/components/TransactionCard";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Transactions() {
  const { state } = useContext(UserContext);

  return (
    <div className="flex-1 p-2 min-h-[612px]">
      <div className="w-full h-full ">
        <p className="text-2xl font-semibold">Transactions</p>
        <div className="flex gap-3 flex-col mt-3 overflow-y-scroll no-scrollbar max-h-[540px]">
          {!state.transactions.length && (
            <h2 className=" text-center font-bold">
              You dont have any transactions yet
            </h2>
          )}
          {state.transactions.map((t) => {
            return <TransactionCard transaction={t} />;
          })}
        </div>
      </div>
    </div>
  );
}
