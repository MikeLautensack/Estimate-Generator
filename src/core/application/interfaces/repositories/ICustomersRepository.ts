import {
  CustomersInsert,
  CustomersSelect,
  PartialCustomer,
} from "@/db/schemas/customers";

export interface ICustomerRepository {
  getCustomers(
    userId: string,
    page: number,
    size: number,
    filters?: Record<string, string>,
  ): Promise<CustomersSelect[]>;
  getCustomerById(id: string): Promise<CustomersSelect>;
  getTotalCustomersByUser(user_id: string): Promise<number>;
  createCustomer(customer: CustomersInsert): Promise<CustomersSelect>;
  updateCustomer(
    id: string,
    customer: PartialCustomer,
  ): Promise<CustomersSelect>;
  deleteCustomer(id: string): Promise<void>;
}
