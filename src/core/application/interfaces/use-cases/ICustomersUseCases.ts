import {
  CustomersInsert,
  CustomersSelect,
  PartialCustomer,
} from "@/db/schemas/customers";

export interface ICustomersUseCases {
  getCustomerById(id: string): Promise<CustomersSelect>;
  getCustomers(
    userId: string,
    page: number,
    size: number,
    filters: Record<string, string>,
  ): Promise<{ customers: CustomersSelect[]; total: number }>;
  createCustomer(customer: CustomersInsert): Promise<CustomersSelect>;
  updateCustomer(
    id: string,
    customer: PartialCustomer,
  ): Promise<CustomersSelect>;
  deleteCustomer(id: string): Promise<void>;
}
