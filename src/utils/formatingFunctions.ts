export const formatTaxString = (num: number): string => {
  const number = num * 100;
  const roundedNumber = number.toFixed(2);
  const taxString = `${roundedNumber}%`;
  return taxString;
};

export const formatPriceString = (numStr: string): string => {
  const num = parseFloat(numStr);
  const roundedNumber = num.toFixed(2);
  const priceString = `$${roundedNumber}`;
  return priceString;
};

export const formatPhoneNumber = (num: string): string | null => {
  const cleaned = ("" + num).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
};

export const formatName = (name: string): string => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatCapitalize = (input: string): string => {
  if (input) {
    return input
      .split(" ") // Split the input string by spaces to get an array of words
      .map((word) => {
        if (word.length > 0) {
          return word[0].toUpperCase() + word.slice(1); // Capitalize the first char and concatenate with the rest of the word
        } else {
          return word; // In case there are multiple spaces, return the empty string as it is
        }
      })
      .join(" "); // Join the array of words back into a single string
  } else {
    return "";
  }
};
