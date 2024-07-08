import { Suspense } from "react";
import SignUpForm from "../../../components/forms/SignUpForm";
import { Card } from "@mui/material";

const Page = () => {
  return (
    <main className="flex justify-center items-center w-full">
      <Suspense fallback={<>Loading...</>}>
        <Card sx={{ backgroundColor: "surfaceContainerLow" }}>
          <SignUpForm />
        </Card>
      </Suspense>
    </main>
  );
};

export default Page;
