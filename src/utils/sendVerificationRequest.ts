import { SendVerificationRequestParams } from "next-auth/providers/email";

const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { identifier, url } = params;
  console.log("testing sendVerificationRequest, url val: ", url);
  const urlObj = new URL(url);
  const host = urlObj.host;
  const searchParams = new URLSearchParams(urlObj.search);
  const callbackUrl = searchParams.get("callbackUrl");
  const callbackUrlObj = new URL(callbackUrl as string);
  const callbackUrlSearchParams = new URLSearchParams(callbackUrlObj.search);

  const emailType = callbackUrlSearchParams.get("email-type");

  const endpoint = `/api/auth/signin/emails/${emailType}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: identifier,
      magicLink: url,
      host: host,
    }),
  };

  try {
    const res = fetch(endpoint, options);
    console.log("res from hitting email endpoint: ", res);
  } catch (error: any) {
    throw new Error("Failed to send the verification email.", error);
  }
};

export default sendVerificationRequest;
