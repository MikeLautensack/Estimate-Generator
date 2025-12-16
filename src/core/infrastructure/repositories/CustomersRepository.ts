import { ICustomerRepository } from "@/core/application/interfaces/repositories/ICustomersRepository";
import {
  CustomersInsert,
  CustomersSelect,
  PartialCustomer,
  contractorsCustomers,
} from "@/db/schemas/customers";
import { eq, and, SQL, isNull, count } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";

export class CustomersRepository implements ICustomerRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  async getCustomers(
    userId: string,
    page: number,
    size: number,
    filters?: Record<string, string>,
  ): Promise<CustomersSelect[]> {
    try {
      let conditions: SQL[] = [isNull(contractorsCustomers.deletedAt)];

      if (filters) {
        if (filters.role === "contractor") {
          conditions.push(eq(contractorsCustomers.contractor_user_id, userId));
        } else if (filters.role === "customer") {
          conditions.push(eq(contractorsCustomers.customer_user_id, userId));
        }
      }

      return await this.databaseService.db
        .select()
        .from(contractorsCustomers)
        .where(and(...conditions))
        .limit(size)
        .offset((page - 1) * size);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCustomerById(id: string): Promise<CustomersSelect> {
    try {
      const [customer] = await this.databaseService.db
        .select()
        .from(contractorsCustomers)
        .where(eq(contractorsCustomers.id, id));

      if (!customer) {
        throw new Error("Customer not found");
      }

      return customer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTotalCustomersByUser(user_id: string): Promise<number> {
    try {
      const query = await this.databaseService.db
        .select({ count: count() })
        .from(contractorsCustomers)
        .where(eq(contractorsCustomers.contractor_user_id, user_id));

      return query[0]?.count ?? 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createCustomer(customer: CustomersInsert): Promise<CustomersSelect> {
    try {
      const queryResults = await this.databaseService.db
        .insert(contractorsCustomers)
        .values(customer)
        .returning();

      return queryResults[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCustomer(
    id: string,
    customer: PartialCustomer,
  ): Promise<CustomersSelect> {
    try {
      const queryResults = await this.databaseService.db
        .update(contractorsCustomers)
        .set({ ...customer, updatedAt: new Date() })
        .where(eq(contractorsCustomers.id, id))
        .returning();

      return queryResults[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      await this.databaseService.db
        .update(contractorsCustomers)
        .set({ deletedAt: new Date() })
        .where(eq(contractorsCustomers.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
