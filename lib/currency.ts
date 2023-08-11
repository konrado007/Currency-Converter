export const customRound = (
  number: number | undefined,
  decimalPlaces?: number
): string => {
  if (number === undefined || number === 0) return "0";
  if (number < 1) {
    // 0,0051265...
    let roundedNumber = "";
    for (let i = 0; i < number.toString().length; i++) {
      if (number.toString()[i] != "0" && number.toString()[i] != ".") {
        console.log(number, i);
        roundedNumber = number
          .toString()
          .slice(0, (decimalPlaces && i + decimalPlaces) || i + 2);
        break;
      }
    }

    return roundedNumber;
  }
  let index = number.toString().indexOf(".");

  return number.toString().slice(0, index + 3);
};
