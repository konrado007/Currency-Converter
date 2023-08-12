import { UserContext } from "@/context/UserContext";
import { customRound } from "@/lib/currency";
import React, { useContext, useEffect, useState } from "react";

interface Props {
  currency: string;
  setEnteredAmount: React.Dispatch<React.SetStateAction<string>>;
}

const Buttons: React.FC<Props> = ({ currency, setEnteredAmount }) => {
  const [active, setActive] = useState<string>("");
  const { state } = useContext(UserContext);

  useEffect(() => {
    const amount = state.currencies.find((c) => c.name == currency)?.amount;
    if (amount) {
      if (active == "1/4") {
        setEnteredAmount(customRound(amount / 4));
      } else if (active == "1/2") {
        setEnteredAmount(customRound(amount / 2));
      } else {
        //MAX
        setEnteredAmount(customRound(amount));
      }
    }
  }, [active]);

  return (
    <div className="flex justify-evenly items-center mt-4">
      <div className="flex gap-1 items-center" onClick={() => setActive("1/4")}>
        <div
          className={`${
            active == "1/4" ? "bg-[#705adf]" : "bg-[#edf0f9]"
          } w-3 h-3 rounded-sm`}
        />
        <p>1/4</p>
      </div>
      <div className="flex gap-1 items-center" onClick={() => setActive("1/2")}>
        <div
          className={`${
            active == "1/2" ? "bg-[#705adf]" : "bg-[#edf0f9]"
          } w-3 h-3 rounded-sm`}
        />
        <p>1/2</p>
      </div>
      <div className="flex gap-1 items-center" onClick={() => setActive("MAX")}>
        <div
          className={`${
            active == "MAX" ? "bg-[#705adf]" : "bg-[#edf0f9]"
          } w-3 h-3 rounded-sm`}
        />
        <p>MAX</p>
      </div>
    </div>
  );
};

export default Buttons;
