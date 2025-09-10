import { ICustomerPATCHRequest } from "@/app/api/v1/customers/[customer_id]/route";
import { IPartialCustomer } from "@/db/schemas/customers";

export class PartialCustomer implements IPartialCustomer {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  addresss2?: string;
  city?: string;
  state?: string;
  zip?: string;
  creditBalance?: string;

  constructor(request: ICustomerPATCHRequest) {
    this.firstName = request.first_name;
    this.lastName = request.last_name;
    this.email = request.email;
    this.phone = request.phone;
    this.address = request.address;
    this.addresss2 = request.address2;
    this.city = request.city;
    this.state = request.state;
    this.zip = request.zip;
    this.creditBalance = request.credit_balance?.toString();
  }
}
