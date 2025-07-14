import { CustomersInsert, CustomersSelect } from "@/db/schemas/customers";

export interface ICustomerRepository {
  getCustomers(
    userId: string,
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<CustomersSelect[]>;
  getCustomerById(id: string): Promise<CustomersSelect>;
  createCustomer(customer: CustomersInsert): Promise<void>;
  updateCustomer(id: string, customer: CustomersInsert): Promise<void>;
  deleteCustomer(id: string): Promise<void>;
}
