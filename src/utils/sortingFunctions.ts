import { ChangeOrder } from "@/types/changeOrders";

const sortChangeOrders = (changeOrders: ChangeOrder[]): ChangeOrder[] => {
  return changeOrders.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  );
};

export { sortChangeOrders };
