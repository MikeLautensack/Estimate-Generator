import DIContainer from "@/core/IoCContainer";
import { EstimatesWithLineItemsInsert } from "@/db/schemas/estimates";
import { ProfileSelect } from "@/db/schemas/profiles";
import z from "zod";

export async function createDraftFactory(
  profile: ProfileSelect,
  validRequest: z.SafeParseSuccess<{
    customerId?: string | undefined;
  }>,
  user: any,
): Promise<EstimatesWithLineItemsInsert> {
  const customerId = validRequest.data.customerId;

  let customer = {
    customerEmail: "",
    customerFirstName: "",
    customerLastName: "",
  };

  if (customerId) {
    const dbCustomer =
      await DIContainer.customersUseCases.getCustomerById(customerId);
    customer.customerEmail = dbCustomer.email;
    customer.customerFirstName = dbCustomer.firstName;
    customer.customerLastName = dbCustomer.lastName;
  }

  return {
    userId: user.id,
    customerId: customerId ?? "",
    estimateNumber: "",
    totalAmount: "0.00",
    contractorAddress: profile.businessAddress,
    contractorAddress2: profile.businessAddress2,
    contractorCity: profile.businessCity,
    contractorState: profile.businessState,
    contractorZip: profile.businessZip,
    contractorName: profile.businessName,
    contractorPhone: profile.businessPhone,
    customerEmail: customer.customerEmail,
    customerFirstName: customer.customerFirstName,
    customerLastName: customer.customerLastName,
    estimateName: "",
    expirationDate: null,
    message: "",
    projectAddress: "",
    projectAddress2: "",
    projectCity: "",
    projectState: "",
    projectZip: "",
    status: "Draft",
    subtotal: 0,
    tax: 0,
    taxMode: "",
    total: 0,
    discountMode: "",
    discountPercentage: 0,
    discount: 0,
    lineItems: [],
  };
}
