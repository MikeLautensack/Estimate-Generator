const sendVerificationRequest = async (params: any) => {
  const { identifier, url } = params;

  const urlObj = new URL(url);
  const host = urlObj.host;
  const searchParams = new URLSearchParams(urlObj.search);
  const callbackUrl = searchParams.get("callbackUrl");
  const callbackUrlObj = new URL(callbackUrl as string);
  const callbackUrlSearchParams = new URLSearchParams(callbackUrlObj.search);
  const emailType = callbackUrlSearchParams.get("email-type");
  const customerName = callbackUrlSearchParams.get("customer-name");
  const contractorName = callbackUrlSearchParams.get("contractor-name");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: identifier,
        from: `${contractorName}<onboarding@resend.dev>`,
        subject:
          emailType === "new-customer"
            ? `${contractorName} has added you as a new customer`
            : emailType === "new-estimate"
              ? `${contractorName} has created a new estimate for you`
              : emailType === "updated-estimate"
                ? `${contractorName} has updated one of your estimates`
                : `New email from ${contractorName}`,
        host: host,
        url: url,
        customerName: customerName,
        contractorName: contractorName,
        emailType: emailType,
      }),
    });
    if (res.status !== 200) {
      throw new Error(`Failed to send the verification email.  Res: ${res}`);
    }
  } catch (error: any) {
    throw new Error(
      `Failed to send the verification email.  Error: ${error.message}`,
      error,
    );
  }
};

export default sendVerificationRequest;
