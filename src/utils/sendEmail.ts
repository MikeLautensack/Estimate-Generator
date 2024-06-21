import { Resend } from "resend";

const sendEmail = async (
  identifier: string,
  from: string,
  subject: string,
  host: string,
  url: string,
  customerName: string,
  contractorName: string,
  template: any,
) => {
  // Instanciate resend
  const resend = new Resend(process.env.EMAIL_KEY);

  // Send email
  try {
    await resend.emails.send({
      from: from,
      to: [identifier],
      subject: subject,
      react: template({
        url,
        host,
        customerName: customerName,
        contractorName: contractorName,
      }),
    });
  } catch (error: any) {
    return error;
  }
};

export { sendEmail };
