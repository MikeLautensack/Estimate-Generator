import { EstimatesWithLineItemsSelect } from "@/db/schemas/estimates";

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export function defaultValuesFactory(estimate: EstimatesWithLineItemsSelect) {
  const asString = (v: unknown) => (v != null ? String(v) : "");
  return {
    id: estimate.id,
    estimateName: estimate.estimateName ?? "",
    customerFirstName: estimate.customerFirstName ?? "",
    customerLastName: estimate.customerLastName ?? "",
    customerEmail: estimate.customerEmail ?? "",
    projectAddress: estimate.projectAddress ?? "",
    projectAddress2: estimate.projectAddress2 ?? "",
    projectCity: estimate.projectCity ?? "",
    projectState: estimate.projectState ?? "",
    projectZip: estimate.projectZip ?? "",
    contractorName: estimate.contractorName ?? "",
    contractorAddress: estimate.contractorAddress ?? "",
    contractorAddress2: estimate.contractorAddress2 ?? "",
    contractorCity: estimate.contractorCity ?? "",
    contractorState: estimate.contractorState ?? "",
    contractorZip: estimate.contractorZip ?? "",
    contractorPhone: estimate.contractorPhone ?? "",
    createdAt: estimate.createdAt.toISOString(),
    updatedAt: estimate.updatedAt.toISOString(),
    expirationDate: estimate.expirationDate.toISOString(),
    lineItems: estimate.lineItems
      ? estimate.lineItems.map((item) => {
          return {
            ...item,
            amount: asString(item.amount),
            description: asString(item.description),
            item: item.item ?? "",
            price: asString(item.price),
            quantity: asString(item.quantity),
            rateType: item.rateType ?? "",
          };
        })
      : [],
    message: estimate.message ?? "",
    subtotal: asString(estimate.subtotal),
    taxMode: estimate.taxMode ?? "",
    taxRate: asString(estimate.taxRate),
    tax: asString(estimate.tax),
    discountMode: estimate.discountMode ?? "",
    discountPercentage: asString(estimate.discountPercentage),
    discount: asString(estimate.discount),
    total: asString(estimate.total),
    status: estimate.status ?? "",
    customer_id: estimate.customerId,
    user_id: estimate.userId,
  };
}
