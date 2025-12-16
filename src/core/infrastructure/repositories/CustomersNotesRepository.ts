import { ICustomersNotesRepository } from "@/core/application/interfaces/repositories/ICustomersNotesRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import {
  CustomersNotesInsert,
  CustomersNotesSelect,
  PartialCustomersNote,
  customersNotes,
} from "@/db/schemas/customersNotes";
import { eq, and, SQL, isNull, count } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export class CustomersNotesRepository implements ICustomersNotesRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  async getNotesByCustomerId(
    customerId: string,
    page: number,
    size: number,
  ): Promise<CustomersNotesSelect[]> {
    try {
      const conditions: SQL[] = [
        eq(customersNotes.customerId, customerId),
        isNull(customersNotes.deletedAt),
      ];

      return await this.databaseService.db
        .select()
        .from(customersNotes)
        .where(and(...conditions))
        .limit(size)
        .offset((page - 1) * size);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getNoteById(id: string): Promise<CustomersNotesSelect> {
    try {
      const [note] = await this.databaseService.db
        .select()
        .from(customersNotes)
        .where(eq(customersNotes.id, id));

      if (!note) {
        throw new Error("Note not found");
      }

      return note;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTotalNotesByCustomer(customerId: string): Promise<number> {
    try {
      const query = await this.databaseService.db
        .select({ count: count() })
        .from(customersNotes)
        .where(eq(customersNotes.customerId, customerId));

      return query[0]?.count ?? 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createNote(note: CustomersNotesInsert): Promise<CustomersNotesSelect> {
    try {
      const [query] = await this.databaseService.db
        .insert(customersNotes)
        .values(note);

      if (!query) {
        throw new Error("Note not found");
      }

      return query;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateNote(note: PartialCustomersNote): Promise<CustomersNotesSelect> {
    try {
      const [query] = await this.databaseService.db
        .update(customersNotes)
        .set({ ...note, updatedAt: new Date() })
        .where(eq(customersNotes.id, note.id))
        .returning();

      if (!query) {
        throw new Error("Note not found");
      }

      return query;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteNote(id: string): Promise<void> {
    try {
      await this.databaseService.db
        .update(customersNotes)
        .set({ deletedAt: new Date() })
        .where(eq(customersNotes.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
