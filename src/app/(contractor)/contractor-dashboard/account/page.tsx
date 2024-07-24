import { db } from "@/db";
import { users } from "@/db/schemas/auth";
import { Card, Divider, Typography } from "@mui/material";
import { Session } from "next-auth";
import React from "react";
import { eq } from "drizzle-orm";
import { auth } from "../../../../../auth";
import AccountForm from "@/components/forms/AccountForm";

async function getData(session: Session) {
  const res = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user?.id));
  return res;
}

const page = async () => {
  const session = await auth();
  const user = await getData(session!);
  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start gap-4 flex-1">
      <Typography color="primary" variant="h4">
        Account
      </Typography>
      <Card
        component="div"
        className="flex flex-col gap-4 w-full h-full p-4"
        sx={{ backgroundColor: "surfaceContainerLow" }}
      >
        <Typography color="primary" variant="body1">
          {`Account Email: ${user[0].email}`}
        </Typography>
        <Divider />
        <AccountForm accountData={user} mode="update" />
      </Card>
    </main>
  );
};

export default page;
