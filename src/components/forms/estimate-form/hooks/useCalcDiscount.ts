const useCalcDiscount = (discountPercentage: string, subtotal: string) => {
  const discountPercentageFloat = parseFloat(discountPercentage) / 100;
  const subtotalFloat = parseFloat(subtotal);
  const discount = subtotalFloat * discountPercentageFloat;
  return discount.toString();
};

export default useCalcDiscount;
