import { Suspense } from "react";
import SignUpForm from "../../../components/forms/SignUpForm";

const Page = () => {
  return (
    <main className="flex justify-center items-center w-full">
      <Suspense fallback={<>Loading...</>}>
        <SignUpForm />
      </Suspense>
    </main>
  );
};

export default Page;
