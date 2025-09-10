import EstimateForm from "@/components/forms/estimate-form/EstimateForm";
import DIContainer from "@/core/IoCContainer";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");

  const p = await params;
  const estimate = await DIContainer.estimatesUseCases.getEstimateById(p.id);

  return (
    <main>
      edit page
      <EstimateForm estimate={estimate} />
    </main>
  );
}
