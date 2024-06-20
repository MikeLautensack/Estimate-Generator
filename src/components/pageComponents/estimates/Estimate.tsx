import { Estimates, LineItems } from "@/types/estimates";
import { columns } from "../../../components/tables/contractorTables/estimateTable/columns";
import EstimateTable from "@/components/tables/contractorTables/estimateTable/EstimateTable";

export default function Estimate({ data }: { data: Estimates }) {
  return (
    <div className="p-4 bg-neutral100 rounded desktop:min-h-full flex flex-col gap-2">
      <h1 className="text-3xl font-semibold">{data?.estimateName}</h1>
      <div className="flex flex-col gap-2 desktop:gap-4 desktop:flex-row desktop:overflow-x-scroll">
        <div className="flex flex-col flex-1 relative">
          <div className="flex justify-between items-center">
            <p>Customer Name:</p>
            <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
              <p className="">{data?.customerName}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>Customer Email:</p>
            <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
              <p className="">{data?.customerEmail}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>Project Address:</p>
            <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
              <p className="">{data?.projectAddress}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 relative">
          <div className="flex justify-between items-center">
            <p>Contractor Name:</p>
            <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
              <p className="">{data?.contractorName}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>Contractor Address:</p>
            <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
              <p className="">{data?.contractorAddress}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>Contractor Phone:</p>
            <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
              <p className="">{data?.contractorPhone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary100 rounded p-2">
        <EstimateTable data={data.lineItems!} columns={columns} />
      </div>
      <div className="flex flex-col gap-2 tablet:flex-row">
        <div className="flex-1 flex flex-col">
          <p>Message</p>
          <p>{data?.message}</p>
        </div>
        <div className="flex flex-col items-end">
          <p>{data?.subtotal}</p>
          <p>{data?.tax}</p>
          <p>{data?.total}</p>
        </div>
      </div>
    </div>
  );
}
