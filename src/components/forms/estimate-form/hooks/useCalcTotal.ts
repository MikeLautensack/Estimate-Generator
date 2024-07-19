const useCalcTotal = (subtotal: string, tax: string) => {
  const subFloat = parseFloat(subtotal);
  const taxFloat = parseFloat(tax);
  const total = subFloat + taxFloat;
  return total.toString();
};

export default useCalcTotal;
