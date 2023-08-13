import { symbols } from "@/constants/currencyRates";
import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  setBoarding: React.Dispatch<React.SetStateAction<boolean>>;
}

const Boarding: React.FC<Props> = ({ setBoarding }) => {
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>(Object.keys(symbols)[0]);
  const [amount, setAmount] = useState<number | null>(null);

  const { state, dispatch } = useContext(UserContext);

  if (state.name != "") {
    setBoarding(false);
  }
  const onBoard = () => {
    if (name != "" && amount && amount > 0) {
      dispatch({ type: "CREATE_USER", payload: { name, symbol, amount } });
    }
  };

  return (
    <div className="text-black bg-[#705adf] w-full h-screen flex items-center justify-center">
      <div className="px-6 py-3 bg-white rounded-lg text-center">
        <p className=" font-bold text-3xl">Welcome to Converter App !</p>
        <h2 className="text-gray-600 font-semibold text-lg">
          Enter your name and your starting balance
        </h2>
        <div className="mt-2 flex flex-col gap-2 items-start">
          <div className="w-full">
            <h2 className="text-left font-bold text-lg text-gray-600">Name</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-[#edf0f9] outline-none font-bold p-2 text-lg border-none rounded-lg w-full"
            />
          </div>
          <div className="text-left font-bold text-lg text-gray-600">
            Your balance
          </div>
          <div className="w-full flex gap-2">
            <div className="flex bg-[#edf0f9] items-center rounded-lg pr-2">
              <select
                className="text-right  outline-none px-4 py-2 rounded-lg bg-transparent appearance-none"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              >
                {Object.keys(symbols).map((option: string) => {
                  return (
                    <option key={option} value={option} className="text-center">
                      {option}
                    </option>
                  );
                })}
              </select>
              <IoIosArrowDown size={20} />
            </div>
            <input
              value={amount || undefined}
              onChange={(e) => setAmount(+e.target.value)}
              type="number"
              className="no-arrows text-right bg-[#edf0f9] outline-none font-bold p-2 text-lg border-none rounded-lg w-full"
            />
          </div>
        </div>
        <button
          disabled={name == "" || !amount || amount <= 0}
          className={`w-full p-2 ${
            name != "" && amount && amount > 0 ? "bg-[#705adf]" : "bg-[#aea6d1]"
          }  mt-4 rounded-lg text-white font-bold`}
          onClick={onBoard}
        >
          GO
        </button>
      </div>
    </div>
  );
};

export default Boarding;
