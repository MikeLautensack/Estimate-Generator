import { ICustomerPOSTRequest } from "@/app/api/v1/customers/route";
import { ICustomer } from "@/db/schemas/customers";

export class Customer implements ICustomer {
  contractor_user_id: string;
  customer_user_id: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;

  constructor(request: ICustomerPOSTRequest, user_id: string) {
    (this.contractor_user_id = user_id),
      (this.customer_user_id = ""),
      (this.firstName = request.first_name),
      (this.lastName = request.last_name),
      (this.email = request.email),
      (this.phone = request.phone),
      (this.address = request.address),
      (this.address2 = request.address2),
      (this.city = request.city),
      (this.zip = request.zip),
      (this.state = request.state);
  }
}
