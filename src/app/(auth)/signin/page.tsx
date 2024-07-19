import { Suspense } from "react";
import SignInForm from "../../../components/forms/SignInForm";
import { Card } from "@mui/material";

const Page = async () => {
  return (
    <main className="flex justify-center items-center w-full">
      <Suspense fallback={<>Loading...</>}>
        <Card sx={{ backgroundColor: "surfaceContainerLow" }}>
          <SignInForm />
        </Card>
      </Suspense>
    </main>
  );
};

export default Page;
