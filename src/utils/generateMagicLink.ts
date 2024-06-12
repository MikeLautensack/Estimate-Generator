const generateMagicLink = (
  callbackUrl: string,
  token: string,
  email: string,
): string => {
  // Encode each parameter
  const encodedCallbackUrl = encodeURIComponent(callbackUrl);
  const encodedToken = encodeURIComponent(token);
  const encodedEmail = encodeURIComponent(email);

  // Construct the magic link
  const magicLink = `http://localhost:3000/api/auth/callback/email?callbackUrl=${encodedCallbackUrl}&token=${encodedToken}&email=${encodedEmail}`;

  return magicLink;
};

export { generateMagicLink };
