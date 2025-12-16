import { EstimatesWithLineItemsInsert } from "@/db/schemas/estimates";

export function updateDraftFactory(
  id: string,
  body: any,
): Partial<EstimatesWithLineItemsInsert> {
  return {
    userId: id,
    contractorAddress: body.contractorAddress,
    contractorAddress2: body.contractorAddress2,
    contractorCity: body.contractorCity,
    contractorState: body.contractorState,
    contractorZip: body.contractorZip,
    contractorName: body.contractorName,
    contractorPhone: body.contractorPhone,
    customerEmail: body.customerEmail,
    customerFirstName: body.customerFirstName,
    customerLastName: body.customerLastName,
    estimateName: body.estimateName,
    message: body.message,
    projectAddress: body.projectAddress,
    projectAddress2: body.projectAddress2,
    projectCity: body.projectCity,
    projectState: body.projectState,
    projectZip: body.projectZip,
    status: body.status,
    subtotal: body.subtotal,
    tax: body.tax,
    taxMode: body.taxMode,
    discountMode: body.discountMode,
    discount: body.discount,
    taxRate: body.taxRate,
    total: body.total,
    expirationDate: new Date(body.expirationDate),
    updatedAt: new Date(),
    lineItems: body.lineItems,
  };
}
