type Currency = {
  name: string;
  amount: number;
};

export type UserType = {
  name: string;
  currencies: Currency[];
};

export const UserValue = {
  name: "",
  currencies: [{ name: "AED", amount: 100 }],
};
