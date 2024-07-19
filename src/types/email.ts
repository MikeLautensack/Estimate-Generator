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

export type EmailDipatchBody<Body> = {
  email: string;
  callbackUrl: string;
  emailType: string;
  subject: string;
  body: Body;
};

export type EmailEndpointBody = {
  email: string;
  magicLink: string;
  host: string;
};
