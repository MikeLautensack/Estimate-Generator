import {
  CustomersNotesInsert,
  CustomersNotesSelect,
  PartialCustomersNote,
} from "@/db/schemas/customersNotes";

export interface ICustomersNotesRepository {
  getNotesByCustomerId(
    customerId: string,
    page: number,
    size: number,
  ): Promise<CustomersNotesSelect[]>;
  getNoteById(id: string): Promise<CustomersNotesSelect>;
  getTotalNotesByCustomer(customerId: string): Promise<number>;
  createNote(note: CustomersNotesInsert): Promise<CustomersNotesSelect>;
  updateNote(note: PartialCustomersNote): Promise<CustomersNotesSelect>;
  deleteNote(id: string): Promise<void>;
}
