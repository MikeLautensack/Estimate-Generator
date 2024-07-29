const useCalcTotal = (subtotal: string, tax: string, discount: string) => {
  const subFloat = parseFloat(subtotal);
  const taxFloat = parseFloat(tax);
  const discountFloat = parseFloat(discount);
  const total = subFloat + taxFloat - discountFloat;
  return total.toString();
};

export default useCalcTotal;
