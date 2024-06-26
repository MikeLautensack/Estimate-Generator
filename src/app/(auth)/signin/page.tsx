import { Suspense } from "react";
import SignInForm from "../../../components/forms/SignInForm";

const Page = async () => {
  return (
    <main className="flex justify-center items-center w-full">
      <Suspense fallback={<>Loading...</>}>
        <SignInForm />
      </Suspense>
    </main>
  );
};

export default Page;
