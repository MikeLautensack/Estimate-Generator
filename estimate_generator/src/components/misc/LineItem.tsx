import { LineItems } from "@/types/estimates";

export default function LineItem({
    id,
    description,
    quantity,
    rateType,
    amount,
}:LineItems) {
  return (
    <div>
        <p>{id}</p>
        <p>{description}</p>
        <p>{quantity}</p>
        <p>{amount}</p>
    </div>
  )
}