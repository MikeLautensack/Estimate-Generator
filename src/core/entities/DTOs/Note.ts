import { ICustomersNotePOSTRequest } from "@/app/api/v1/customers/[customer_id]/notes/route";
import { ICustomersNotes } from "@/db/schemas/customersNotes";
import { mysqlTableWithSchema } from "drizzle-orm/mysql-core";

export class Note implements ICustomersNotes {
  customerId: string;
  note: string;

  constructor(request: ICustomersNotePOSTRequest) {
    this.customerId = request.params.id;
    this.note = request.body.note;
  }
}
