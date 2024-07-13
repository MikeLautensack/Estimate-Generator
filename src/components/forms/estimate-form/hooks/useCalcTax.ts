const useCalcTax = (subtotal: string, taxRate: string) => {
  const st = parseFloat(subtotal);
  const tr = parseFloat(taxRate);
  const tax = st * (tr / 100);
  return tax.toString();
};

export default useCalcTax;
