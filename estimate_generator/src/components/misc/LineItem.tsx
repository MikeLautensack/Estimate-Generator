import { LineItems } from "@/types/estimates";

export default function LineItem({
    id,
    description,
    quantity,
    rateType,
    amount,
}:LineItems) {
  return (
    <div className="">
        <p>{id}</p>
        <p>{description}</p>
        <p>{quantity}</p>
        <p>{amount}</p>
    </div>
  )
}