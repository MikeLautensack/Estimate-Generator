export type emailProps = {
  url: string;
  host: string;
};

export type NewCustomerEmailProps = {
  url: string;
  host: string;
  customerName: string;
  contractorName: string;
};

export type NewEstimateEmailProps = {
  url: string;
  host: string;
  customerName: string;
  contractorName: string;
};

export type UpdatedEstimateEmailProps = {
  url: string;
  host: string;
  customerName: string;
  contractorName: string;
};
