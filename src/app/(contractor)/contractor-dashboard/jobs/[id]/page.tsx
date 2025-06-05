import { auth } from "../../../../../../auth";
import DIContainer from "@/core/DIContainer";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const data = await DIContainer.jobsUseCases.getJobById(params.id);

  return (
    <main className="flex-1 p-8 desktop:px-16 lg:px-32 min-h-[calc(100vh-56px)]"></main>
  );
};

export default Page;
