import LineItem from "@/components/misc/LineItem";
import { Card } from "@/components/ui/card";
import { Estimates } from "@/types/estimates";

export default function Estimate({data}: {data: Estimates}) {
  return (
    <div className="p-4 bg-primary50 rounded">
      <h1>{data?.estimateName}</h1>
      <div className='flex flex-col gap-2 tablet:flex-row'>
        <div className='flex-1'>
          <p>{data?.customerName}</p>
          <p>{data?.customerEmail}</p>
          <p>{data?.projectAddress}</p>
        </div>
        <div className='flex-1'>
          <p>{data?.contractorName}</p>
          <p>{data?.contractorAddress}</p>
          <p>{data?.contractorPhone}</p>
        </div>
      </div>
      <div className="bg-primary100 rounded p-2">
        {data?.lineItems?.map((item) => (
            <LineItem 
              key={item.id}
              id={item.id}
              description={item.description}
              quantity={item.quantity}
              amount={item.amount} 
              item={item.item}
              rateType={item.rateType} 
              price={item.price}            
            />
        ))}
      </div>
      <div className='flex flex-col gap-2 tablet:flex-row'>
        <div className='flex-1 flex flex-col'>
          <p>Message</p>
          <p>{data?.message}</p>
        </div>
        <div className='flex flex-col items-end'>
          <p>{data?.subtotal}</p>            
          <p>{data?.tax}</p>
          <p>{data?.total}</p>
        </div>
      </div>
    </div>
  )
}
