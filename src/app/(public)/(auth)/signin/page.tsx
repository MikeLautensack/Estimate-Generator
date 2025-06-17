import SignInForm from "../../../../components/forms/SignInForm";
import { Card } from "@mui/material";

const Page = async () => {
  return (
    <main className="flex justify-center items-center w-full">
      <Card sx={{ backgroundColor: "surfaceContainerLow" }}>
        <SignInForm />
      </Card>
    </main>
  );
};

export default Page;
