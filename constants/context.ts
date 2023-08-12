type Currency = {
  name: string;
  amount: number;
};

export type Transaction = {
  date: Date;
  currencyToSell: string;
  balanceBeforeToSell: number;
  balanceAfterToSell: number;
  amountOfCurrencyToSell: number;
  currencyToBuy: string;
  balanceBeforeToBuy: number;
  balanceAfterToBuy: number;
  amountOfCurrencyToBuy: number;
};

export type UserType = {
  name: string;
  transactions: Transaction[];
  currencies: Currency[];
};

export const UserValue = {
  name: "",
  transactions: [],
  currencies: [{ name: "EUR", amount: 100 }],
};
