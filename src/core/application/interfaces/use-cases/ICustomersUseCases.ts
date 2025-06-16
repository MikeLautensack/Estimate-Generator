import { CustomersInsert, CustomersSelect } from "@/db/schemas/customers";

export interface ICustomersUseCases {
  getCustomerById(id: string): Promise<CustomersSelect>;
  getCustomers(
    id: string,
    page: string,
    size: string,
  ): Promise<CustomersSelect[]>;
  createCustomer(customer: CustomersInsert): Promise<void>;
  updateCustomer(id: string, customer: CustomersInsert): Promise<void>;
  deleteCustomer(id: string): Promise<void>;
}
