import { redirect } from "next/navigation";
import DIContainer from "@/core/DIContainer";

const Page = async ({ params }: { params: { id: string } }) => {
  const { data, error } = await DIContainer.authUseCases.getUser();
  if (error || !data) redirect("/signin");
  const job = await DIContainer.jobsUseCases.getJobById(params.id);

  return (
    <main className="flex-1 p-8 desktop:px-16 lg:px-32 min-h-[calc(100vh-56px)]"></main>
  );
};

export default Page;
