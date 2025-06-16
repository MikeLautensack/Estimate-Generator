import { CustomersInsert, CustomersSelect } from "@/db/schemas/customers";
import { ICustomerRepository } from "../interfaces/repositories/ICustomersRepository";
import { ICustomersUseCases } from "../interfaces/use-cases/ICustomersUseCases";
import { ISupabaseService } from "../interfaces/services/ISupabaseService";
import { custom } from "zod";

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
    id: string,
    page: string,
    size: string,
  ): Promise<CustomersSelect[]> {
    const filters = {
      role: "contractor",
    };
    return await this.customersRepository.getCustomers(id, page, size, filters);
  }

  async createCustomer(customer: NewCustomer): Promise<void> {
    const newCustomerUser = await this.supabaseService.inviteUser(
      customer.email,
    );
    const newCustomer = {
      ...customer,
      customer_user_id: newCustomerUser.user.id,
    };
    await this.customersRepository.createCustomer(newCustomer);
  }

  async updateCustomer(id: string, customer: CustomersInsert): Promise<void> {
    return await this.customersRepository.updateCustomer(id, customer);
  }

  async deleteCustomer(id: string): Promise<void> {
    return await this.customersRepository.deleteCustomer(id);
  }
}
