const useCalcAmount = (quantity: string, price: string) => {
  let quantityFloat;
  let priceFloat;
  if (quantity === "") {
    quantityFloat = 0;
  }
  if (price === "") {
    priceFloat = 0;
  }
  quantityFloat = parseFloat(quantity);
  priceFloat = parseFloat(price);
  const amount = quantityFloat * priceFloat;
  return amount.toString();
};

export default useCalcAmount;
