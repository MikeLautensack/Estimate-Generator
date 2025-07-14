import { redirect } from "next/navigation";
import { Typography } from "@mui/material";
import ContractorsCustomersTable from "@/components/tables/contractorTables/customersTable/ContractorsCustomersTable";
import DIContainer from "@/core/DIContainer";
import { CustomersFormProvider } from "@/contexts/CustomersFormContext";
import NewCustomerButton from "@/components/misc/NewCustomerButton";
import CustomerFormWrapper from "@/components/wrappers/CustomerFormWrapper";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: PageProps) => {
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");
  const page = (await searchParams).page as string;
  const pageSize = (await searchParams).pageSize as string;
  const customers = await DIContainer.customersUseCases.getCustomers(
    user.id,
    page,
    pageSize,
  );

  return (
    <main className="flex-grow p-4 flex flex-col gap-4 min-h-screen">
      <CustomersFormProvider>
        <CustomerFormWrapper>
          <div className="flex flex-col gap-4">
            <Typography variant="h4" color="primary" className="">
              Customers
            </Typography>
            <NewCustomerButton />
            <ContractorsCustomersTable
              customers={customers}
              page={page}
              pageSize={pageSize}
              totalRows={customers.length}
            />
          </div>
        </CustomerFormWrapper>
      </CustomersFormProvider>
    </main>
  );
};

export default Page;
