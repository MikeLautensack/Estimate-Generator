import {
  CustomersNotesInsert,
  CustomersNotesSelect,
  PartialCustomersNote,
} from "@/db/schemas/customersNotes";
import { ICustomersNotesRepository } from "../interfaces/repositories/ICustomersNotesRepository";
import { ICustomersNotesUseCases } from "../interfaces/use-cases/ICustomersNotesUseCases";

export class CustomersNotesUseCases implements ICustomersNotesUseCases {
  constructor(
    private readonly customersNotesRepository: ICustomersNotesRepository,
  ) {}

  async getNotesByCustomerId(
    customerId: string,
    page: number,
    size: number,
  ): Promise<{ notes: CustomersNotesSelect[]; total: number }> {
    const notes = await this.customersNotesRepository.getNotesByCustomerId(
      customerId,
      page,
      size,
    );

    const total =
      await this.customersNotesRepository.getTotalNotesByCustomer(customerId);

    return {
      notes,
      total,
    };
  }

  async getNoteById(id: string): Promise<CustomersNotesSelect> {
    return await this.customersNotesRepository.getNoteById(id);
  }

  async createNote(note: CustomersNotesInsert): Promise<CustomersNotesSelect> {
    return await this.customersNotesRepository.createNote(note);
  }

  async updateNote(note: PartialCustomersNote): Promise<CustomersNotesSelect> {
    return await this.customersNotesRepository.updateNote(note);
  }

  async deleteNote(id: string): Promise<void> {
    return await this.customersNotesRepository.deleteNote(id);
  }
}
