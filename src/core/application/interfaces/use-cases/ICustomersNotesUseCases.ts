import {
  CustomersNotesInsert,
  CustomersNotesSelect,
  PartialCustomersNote,
} from "@/db/schemas/customersNotes";

export interface ICustomersNotesUseCases {
  getNotesByCustomerId(
    customerId: string,
    page: number,
    size: number,
  ): Promise<{ notes: CustomersNotesSelect[]; total: number }>;
  getNoteById(id: string): Promise<CustomersNotesSelect>;
  createNote(note: CustomersNotesInsert): Promise<CustomersNotesSelect>;
  updateNote(note: PartialCustomersNote): Promise<CustomersNotesSelect>;
  deleteNote(id: string): Promise<void>;
}
