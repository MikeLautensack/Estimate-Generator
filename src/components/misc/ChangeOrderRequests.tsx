"use client";

import { ChangeOrderRequestsProps, ChangeOrder } from "@/types/changeOrders";
import React, { useEffect, useState } from "react";
import ChangeOrderRequestsTable from "../tables/contractorTables/changeOrderRequestsTable/ChangeOrderRequestsTable";
import { Button } from "../ui/button";
import ChangeOrderRequest from "./ChangeOrderRequest";

const ChangeOrderRequests = ({ changeOrders }: ChangeOrderRequestsProps) => {
  const [orders, setOrders] = useState(changeOrders);
  const [id, setId] = useState<number | null>(
    changeOrders?.length ? changeOrders[0].id : null,
  );
  const [changeOrder, setChangeOrder] = useState<ChangeOrder>(
    changeOrders?.length
      ? changeOrders[0]
      : {
          id: 0,
          changeOrderName: "",
          estimateName: "",
          description: "",
          customerName: "",
          projectAddress: "",
          status: "",
          estimate_id: 0,
          dateCreated: new Date(),
          dateUpdated: new Date(),
          contractor_user_id: 0,
          customer_user_id: 0,
        },
  );

  // const createDateArray = (arr: ChangeOrders[]): ChangeOrders[] => {
  //   if (arr == undefined || null) {
  //    return [];
  //   } else {
  //     return arr;
  //   }
  // };

  useEffect(() => {
    loadChangeOrder(id as number);
  }, [id]);

  const loadChangeOrder = (id: number) => {
    for (let i = 0; i < changeOrders.length; i++) {
      if (changeOrders[i].id == id) {
        setChangeOrder(changeOrders[i]);
      }
    }
  };

  const removeItem = (id: number) => {
    setOrders((prevOrders) => {
      const arr = prevOrders.filter((order) => order.id != id);
      setId(arr.length > 0 ? arr[0].id : null);
      return arr;
    });
  };

  const markCompleted = async (id: number) => {
    await fetch(
      `${process.env["NEXT_PUBLIC_CHANGE_ORDERS_UPDATE_STATUS"]}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      },
    );
    removeItem(id);
  };

  const reject = async (id: number) => {
    await fetch(
      `${process.env["NEXT_PUBLIC_CHANGE_ORDERS_UPDATE_STATUS"]}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Rejected",
        }),
      },
    );
    removeItem(id);
  };

  const saveForLater = async (id: number) => {
    await fetch(
      `${process.env["NEXT_PUBLIC_CHANGE_ORDERS_UPDATE_STATUS"]}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Saved For Later",
        }),
      },
    );
    removeItem(id);
  };

  return (
    <div className="bg-neutral400 max-tablet:border-t border-neutral-300 relative top-0 right-0 desktop:w-96 desktop:h-screen desktop:sticky flex flex-col p-2 gap-0 desktop:bg-neutral100">
      <div className="">
        <h1 className="">Change Order Requests</h1>
        <p className="">{`You have ${orders?.length} change order requests`}</p>
      </div>

      <div className="flex flex-col gap-2 flex-1 justify-between">
        <div id="tabel" className="w-full desktop:flex-1">
          <ChangeOrderRequestsTable
            data={orders}
            setId={setId}
            id={id as number}
          />
        </div>
        <div className="flex flex-col gap-2 desktop:h-64">
          <div id="selected" className="">
            <ChangeOrderRequest changeOrder={changeOrder} />
          </div>
          <div id="buttons" className="flex items-center gap-2">
            <Button
              id=""
              className="flex-1"
              onClick={() => markCompleted(id as number)}
            >
              Mark Completed
            </Button>
            <Button
              id=""
              className="flex-1"
              onClick={() => saveForLater(id as number)}
            >
              Save For Later
            </Button>
            <Button
              id=""
              className="flex-1"
              onClick={() => reject(id as number)}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeOrderRequests;
