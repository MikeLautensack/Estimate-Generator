import { ChangeOrder } from "@/types/changeOrders";

const sortChangeOrders = (changeOrders: ChangeOrder[]): ChangeOrder[] => {
  return changeOrders.sort(
    (a, b) => b.dateUpdated!.getTime() - a.dateUpdated!.getTime(),
  );
};

export { sortChangeOrders };
