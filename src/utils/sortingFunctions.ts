import { ChangeOrders } from "@/types/changeOrders";

const sortChangeOrders = (changeOrders: ChangeOrders[]): ChangeOrders[] => {
  return changeOrders.sort((a, b) => b.dateUpdated!.getTime() - a.dateUpdated!.getTime());
};

export {
    sortChangeOrders
}