import { LineItems } from "@/types/estimates";

const LineItem = ({
    id,
    description,
    quantity,
    amount,
}:LineItems) => {
  return (
    <div className="">
        <p>{id}</p>
        <p>{description}</p>
        <p>{quantity}</p>
        <p>{amount}</p>
    </div>
  );
}

export default LineItem;