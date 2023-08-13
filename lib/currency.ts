export const customRound = (
  number: number | undefined,
): string => {
  if (number === undefined || number === 0) return "0";
  let stringNumber = number.toString();
  if (stringNumber.includes(".")) {
    for (let i = 0; i < stringNumber.length; i++) {
      if (stringNumber[i] != "0" && stringNumber.indexOf(".") < i) {
        stringNumber = stringNumber.slice(0, i + 3);
      }
    }
  }

  return stringNumber;
};
