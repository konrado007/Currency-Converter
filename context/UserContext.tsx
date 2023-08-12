import { UserType, UserValue } from "@/constants/context";
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

//reducer func
const reducer = (state: UserType, action: ActionType): UserType => {
  switch (action.type) {
    case "BUY":
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
          currencies: updatedCurrencies,
        };
      } else {
        return {
          ...state,
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
