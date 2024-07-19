export type Profile = {
  id: number;
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  user_id: string;
};
