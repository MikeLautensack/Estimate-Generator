import SignUpForm from "../../../../components/forms/SignUpForm";
import { Card } from "@mui/material";

const Page = () => {
  return (
    <main className="flex justify-center items-center w-full">
      <Card sx={{ backgroundColor: "surfaceContainerLow" }}>
        <SignUpForm />
      </Card>
    </main>
  );
};

export default Page;
