import Estimate from "@/components/pageComponents/estimates/Estimate";
import DIContainer from "@/core/IoCContainer";
import { redirect } from "next/navigation";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: PageProps) => {
  // Auth
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");

  return (
    <main className="flex-1 p-8 desktop:px-16 lg:px-32 min-h-screen">
      <Estimate estimate={data} profile={profile} />
    </main>
  );
};

export default Page;
