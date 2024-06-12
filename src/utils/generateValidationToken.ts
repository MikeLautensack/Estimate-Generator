import { verificationTokens } from "@/db/schemas/auth";
import { db } from "../db";
import crypto from "crypto";

const generateValidationToken = async (identifier: string) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 3600000); // Token valid for 1 hour

  await db.insert(verificationTokens).values({
    identifier,
    token,
    expires,
  });

  return token;
};

export { generateValidationToken };
