import { Transaction, UserType, UserValue } from "@/constants/context";
import { customRound } from "@/lib/currency";
import React, { Dispatch, createContext, useReducer } from "react";

//Action Type
type ActionType = {
  type: "BUY";
  payload: {
    currencyToExchange: string;
    amountOfCurrencyToExchange: number;
    currencyToBuy: string;
    amountOfCurrencyToBuy: number;
  };
};

const createTransaction = (
  state: UserType,
  action: ActionType
): Transaction => {
  const beforeToSell = state.currencies.find(
    (c) => c.name == action.payload.currencyToExchange
  )!.amount;

  const beforeToBuyItem = state.currencies.find(
    (c) => c.name == action.payload.currencyToBuy
  );
  let beforeToBuyAmount;
  beforeToBuyItem
    ? (beforeToBuyAmount = beforeToBuyItem.amount)
    : (beforeToBuyAmount = 0);

  return {
    date: new Date(),
    balanceBeforeToSell: beforeToSell,
    balanceAfterToSell: 
      beforeToSell - action.payload.amountOfCurrencyToExchange
    ,
    balanceBeforeToBuy: beforeToBuyAmount,
    balanceAfterToBuy: 
      beforeToBuyAmount + action.payload.amountOfCurrencyToBuy
    ,
    currencyToSell: action.payload.currencyToExchange,
    amountOfCurrencyToSell: 
      action.payload.amountOfCurrencyToExchange
    ,
    currencyToBuy: action.payload.currencyToBuy,
    amountOfCurrencyToBuy: action.payload.amountOfCurrencyToBuy,
  };
};

//reducer func
const reducer = (state: UserType, action: ActionType): UserType => {
  switch (action.type) {
    case "BUY":
      if (action.payload.currencyToBuy == action.payload.currencyToExchange)
        //if currencies are the same do nothing and return state
        return state;
      const transaction = createTransaction(state, action);

      let updatedCurrencies = state.currencies.map((currency) => {
        if (currency.name === action.payload.currencyToExchange) {
          return {
            ...currency,
            amount: currency.amount - action.payload.amountOfCurrencyToExchange,
          };
        }
        if (currency.name === action.payload.currencyToBuy) {
          return {
            ...currency,
            amount: currency.amount + action.payload.amountOfCurrencyToBuy,
          };
        }
        return currency;
      });

      const isBought = updatedCurrencies.find(
        (c) => c.name === action.payload.currencyToBuy
      );

      const equalZero = updatedCurrencies.find((c) => c.amount === 0);
      if (equalZero) {
        updatedCurrencies = updatedCurrencies.filter(
          (c) => c.name !== equalZero.name
        );
      }
      if (isBought) {
        return {
          ...state,
          transactions: [transaction, ...state.transactions],
          currencies: updatedCurrencies,
        };
      } else {
        return {
          ...state,
          transactions: [transaction, ...state.transactions],
          currencies: [
            ...updatedCurrencies,
            {
              name: action.payload.currencyToBuy,
              amount: action.payload.amountOfCurrencyToBuy,
            },
          ],
        };
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

//context object type {state, dispatch}
type ContextType = {
  state: UserType;
  dispatch: Dispatch<ActionType>;
};

export const UserContext = createContext<ContextType>({
  state: UserValue,
  dispatch: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, UserValue);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
