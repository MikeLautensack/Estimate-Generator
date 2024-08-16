export type Profile = {
  id: number;
  businessName: string;
  businessAddress: string;
  businessAddress2: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessEmail: string;
  businessPhone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  user_id: string;
};
