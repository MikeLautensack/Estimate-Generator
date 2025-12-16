import { ICustomersNotePATCHRequest } from "@/app/api/v1/customers/[customer_id]/notes/[note_id]/route";
import { IPartialCustomersNote } from "@/db/schemas/customersNotes";

export class PartialNote implements IPartialCustomersNote {
  id: string;
  customerId?: string;
  note?: string;

  constructor(request: ICustomersNotePATCHRequest) {
    this.id = request.params.note_id;
    this.customerId = request.params.customer_id;
    this.note = request.body.note;
  }
}
