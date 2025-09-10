import {
  CustomersInsert,
  CustomersSelect,
  PartialCustomer,
} from "@/db/schemas/customers";
import { ICustomerRepository } from "../interfaces/repositories/ICustomersRepository";
import { ICustomersUseCases } from "../interfaces/use-cases/ICustomersUseCases";
import { ISupabaseService } from "../interfaces/services/ISupabaseService";

type NewCustomer = Omit<CustomersInsert, "customer_user_id">;

export class CustomersUseCases implements ICustomersUseCases {
  constructor(
    private readonly customersRepository: ICustomerRepository,
    private readonly supabaseService: ISupabaseService,
  ) {}

  async getCustomerById(id: string): Promise<CustomersSelect> {
    return await this.customersRepository.getCustomerById(id);
  }

  async getCustomers(
    userId: string,
    page: number,
    size: number,
    filters: Record<string, string>,
  ): Promise<{ customers: CustomersSelect[]; total: number }> {
    const total =
      await this.customersRepository.getTotalCustomersByUser(userId);
    const customers = await this.customersRepository.getCustomers(
      userId,
      page,
      size,
      filters,
    );

    return {
      customers,
      total,
    };
  }

  async createCustomer(customer: NewCustomer): Promise<CustomersSelect> {
    // The line below is for the automatic creation of a customer
    // user when a contractor user creates a customer but for now is
    // not being used

    // const newCustomerUser = await this.supabaseService.inviteUser(
    //   customer.email,
    // );

    const newCustomer = {
      ...customer,
      customer_user_id: null,
    };

    return await this.customersRepository.createCustomer(newCustomer);
  }

  async updateCustomer(
    id: string,
    customer: PartialCustomer,
  ): Promise<CustomersSelect> {
    return await this.customersRepository.updateCustomer(id, customer);
  }

  async deleteCustomer(id: string): Promise<void> {
    return await this.customersRepository.deleteCustomer(id);
  }
}
