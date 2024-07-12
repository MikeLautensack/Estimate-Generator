const useCalcTax = (subtotal: string, taxRate: string) => {
  console.log(
    "This log is testing the value of, the useCalcTax args, subtotal and taxRate",
    { subtotal: subtotal, taxRate: taxRate },
  );
  const st = parseFloat(subtotal);
  const tr = parseFloat(taxRate);
  const tax = st * tr;
  return tax.toString();
};

export default useCalcTax;
