import React, { useState } from "react";
import ExchangeCard from "@/components/exchangeCard";

export default function Converter() {
  return (
    <div className="flex-1 p-2 bg-gray-200">
      <div className="w-full h-full flex flex-col ">
        <p className="text-2xl font-semibold">Converter</p>
        <div className="flex-1 flex items-center justify-center">
          <div className="mt-5 flex-1 flex justify-center gap-2 flex-col items-center">
            <ExchangeCard label="Enter amount" />
            <ExchangeCard label="Amount" down calculatedCurrency={0} />
            <button className="w-2/3 bg-[#705adf] mt-2 py-3 px-2 rounded-lg text-lg font-bold shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] text-white">
              Buy 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
