import { ChangeOrders } from "@/types/changeOrders";
import { sortChangeOrders } from "./sortingFunctions";

const checkChangeOrders = (orders: ChangeOrders[]): boolean => {
  if (!orders || orders.length === 0) {
    return false;
  }
  if (!orders.some(order => order.status === "Pending Approval" || order.status === "Saved For Later")) {
    return false;
  }
  return true;
};

const createArray = (changeOrders: ChangeOrders[]): ChangeOrders[] => {
  const arr = sortChangeOrders(changeOrders);
  const array = arr.filter(order => {
    if (order.status == "Pending Approval") {
      return true;
    } else if (order.status == "Saved For Later") {
      return true;
    } else {
      return false;
    }
  });
  return array;
};

export {
    checkChangeOrders,
    createArray
}